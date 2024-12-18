// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LendingBorrowingWithCollateral {
    address  owner;
    uint256 public interestRate; // Annual interest rate in percentage
    uint256  constant SECONDS_IN_A_YEAR = 365 days;
    uint256 public collateralRatio; // Minimum collateral ratio in percentage (e.g., 150 for 150%)
    uint256  poolBalance;
    uint256 public totalInterestPool; // Total interest accrued


    struct Lender {
    uint256 deposit;
    uint256 lastInterestTimestamp; // Track the last interest calculation time
}


    struct Borrower {
        uint256 borrowedAmount;
        uint256 collateralAmount;
        uint256 lastBorrowTimestamp;
    }

    mapping(address => Lender) public lenders;
    mapping(address => Borrower) public borrowers;
    mapping(address => uint256) public lenderBalances;
    mapping(address => uint256) public totalBorrowedAmount;
    mapping(address => uint256) public collateralGiven;
    mapping(address => uint256) public lenderInterest;



    event Deposit(address indexed lender, uint256 amount);
    event Borrow(address indexed borrower, uint256 amount);
    event Repay(address indexed borrower, uint256 amount);
    event Withdraw(address indexed lender, uint256 amount);
    event ProvideCollateral(address indexed borrower, uint256 amount);

    constructor(uint256 _interestRate, uint256 _collateralRatio) {
        owner = msg.sender;
        interestRate = _interestRate; // Set annual interest rate
        collateralRatio = _collateralRatio; // Set collateral ratio (e.g., 150 for 150%)
    }

      function redeemInterest() public {
    require(lenders[msg.sender].deposit > 0, "No deposit found for this lender");

    uint256 interest = calculateLenderInterest(msg.sender);
    require(interest > 0, "No interest available for redemption");

    lenders[msg.sender].lastInterestTimestamp = block.timestamp; // Reset timestamp
    poolBalance -= interest; // Deduct from the pool balance

    payable(msg.sender).transfer(interest); // Transfer the calculated interest
    emit Withdraw(msg.sender, interest); // Reuse Withdraw event for interest redemption
}

    //lender balance function
    function lenderBalance(address lender) external view returns (uint256) {
    require(lenders[lender].deposit > 0, "Address is not a lender");
    return lenderBalances[lender];
}
    function pool() external view returns (uint256) {
    return poolBalance;
}



    // Lender deposits Ether into the contract
    function lend() external payable {
    require(msg.value > 0, "Deposit amount must be greater than zero");

    if (lenders[msg.sender].deposit > 0) {
        // Accrue interest if the lender has an existing deposit
        redeemInterest();
    }

    lenders[msg.sender].deposit += msg.value;
    lenders[msg.sender].lastInterestTimestamp = block.timestamp; // Update timestamp
    lenderBalances[msg.sender] += msg.value;
    poolBalance += msg.value;

    emit Deposit(msg.sender, msg.value);
}


    // Borrower provides collateral
    function provideCollateralAndBorrow(uint256 amount) external payable {
        // provide collateral
        require(msg.value > 0, "Collateral amount must be greater than zero");
        borrowers[msg.sender].collateralAmount += msg.value;
        emit ProvideCollateral(msg.sender, msg.value);
        //borrow
        require(amount > 0, "Borrow amount must be greater than zero");

        uint256 requiredCollateral = (amount * collateralRatio) / 100;
        require(borrowers[msg.sender].collateralAmount >= requiredCollateral, "Insufficient collateral");

        require(poolBalance >= amount, "Insufficient pool balance");
        
        borrowers[msg.sender].borrowedAmount += amount;
        borrowers[msg.sender].lastBorrowTimestamp = block.timestamp;

        payable(msg.sender).transfer(amount);
        emit Borrow(msg.sender, amount);
        poolBalance -= amount;
        totalBorrowedAmount[msg.sender] += amount;
        collateralGiven[msg.sender] += msg.value;


    }

    // Calculate accrued interest for the borrower
    function calculateInterest(address borrower) public view returns (uint256) {
        Borrower memory b = borrowers[borrower];
        if (b.borrowedAmount == 0) {
            return 0;
        }

        uint256 timeElapsed = block.timestamp - b.lastBorrowTimestamp; // Time in seconds
        uint256 interest = (b.borrowedAmount * interestRate * timeElapsed) / (100 * SECONDS_IN_A_YEAR);
        return interest;
    }

    // Borrower repays borrowed Ether with interest
    function repay() external payable {
        require(msg.value > 0, "Repay amount must be greater than zero");

        uint256 accruedInterest = calculateInterest(msg.sender);
        uint256 totalDebt = borrowers[msg.sender].borrowedAmount + accruedInterest;

        require(msg.value <= totalDebt, "Repay amount exceeds total debt");
        totalInterestPool += accruedInterest;



        if (msg.value > accruedInterest) {
            
    borrowers[msg.sender].borrowedAmount -= (msg.value - accruedInterest);


        } else {
            // Partial payment for interest only
            accruedInterest -= msg.value;
        }
        if (borrowers[msg.sender].borrowedAmount == 0) {
    uint256 collateralToReturn = collateralGiven[msg.sender];
    collateralGiven[msg.sender] = 0;
    borrowers[msg.sender].collateralAmount = 0;
    payable(msg.sender).transfer(collateralToReturn);
    emit Withdraw(msg.sender, collateralToReturn);
    collateralGiven[msg.sender] = 0;
}


        borrowers[msg.sender].lastBorrowTimestamp = block.timestamp; // Reset timestamp for remaining debt
        emit Repay(msg.sender, msg.value);
    }

    // Lender withdraws their deposit
    function withdraw(uint256 amount) external {
        require(amount > 0, "Withdraw amount must be greater than zero");
        require(lenderBalances[msg.sender] >= amount, "Withdraw amount exceeds lender balance");
        require(poolBalance >= amount, "Your money is lended, please try again later");

        lenders[msg.sender].deposit -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdraw(msg.sender, amount);
        lenderBalances[msg.sender] -= amount;
        poolBalance -= amount;

    }

    // Change interest rate (owner only)
    function setInterestRate(uint256 newRate) external {
        require(msg.sender == owner, "Only owner can set interest rate");
        interestRate = newRate;
    }

    // Change collateral ratio (owner only)
    function setCollateralRatio(uint256 newRatio) external {
        require(msg.sender == owner, "Only owner can set collateral ratio");
        collateralRatio = newRatio;
    }

    function calculateLenderInterest(address lender) public view returns (uint256) {
    Lender memory l = lenders[lender];
    if (l.deposit == 0) {
        return 0;
    }

    uint256 timeElapsed = block.timestamp - l.lastInterestTimestamp; // Time in seconds
    uint256 rawInterest = (l.deposit * interestRate * timeElapsed) / (100 * SECONDS_IN_A_YEAR);
    uint256 platformFee = (rawInterest * 5) / 100; // Deduct 5% as platform fee
    return rawInterest - platformFee;
}

}