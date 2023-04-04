// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface TokenRecipient {
    function receiveApproval(
        address _from,
        uint256 _value,
        address _token,
        bytes calldata _extraData
    ) external;
}

contract ManualTdx {
    bytes32 public immutable name;
    bytes32 public immutable symbol;
    uint8 public constant decimals = 18;
    // 18 decimals is the strongly suggested default, avoid changing it
    uint256 public totalSupply;
    address public immutable deployer;

    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowance;

    event Approval(address indexed owner, address indexed spender, uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Burn(address indexed owner, uint256 amount);

    error Tdx__InsufficientBalance();
    error Tdx__NotOwner();

    constructor(uint256 _totalSupply, bytes32 _name, bytes32 _symbol) {
        name = _name;
        totalSupply = _totalSupply;
        symbol = _symbol;
        deployer = payable(msg.sender);
    }

    modifier onlyOwner() {
        if (msg.sender != deployer) {
            revert Tdx__NotOwner();
        }
        _;
    }

    function _transfer(address _from, address _to, uint256 _amount) internal {
        require(_to != address(0x0), "Can't transfer to address 0x0, use burn instead");
        if (balances[_from] < _amount) {
            revert Tdx__InsufficientBalance();
        }
        require(balances[_to] + _amount >= balances[_to]);
        uint256 previousBalances = balances[_from] + balances[_to] + _amount;
        balances[_from] -= _amount;
        balances[_to] += _amount;
        emit Transfer(_from, _to, _amount);
        assert(previousBalances == balances[_from] + balances[_to]);
    }

    /**
     * @dev transfer funds between accounts
     * @param _to The account to transfer to
     * @param _amount The amount to transfer
     */
    function transfer(address _to, uint256 _amount) public {
        _transfer(msg.sender, _to, _amount);
    }

    /**
     * @dev Transfer tokens from other address
     * Send `_value` tokens to `_to` on behalf of `_from`
     * @param _from The address of the sender
     * @param _to The address of the recipient
     * @param _amount the amount to send
     * @return boolean to indicate transfer success
     */
    function transferFrom(address _from, address _to, uint256 _amount) public returns (bool) {
        require(allowance[_from][msg.sender] >= _amount, "Insuffience allowance permissions");
        _transfer(_from, _to, _amount);
        return true;
    }

    function approve(address _spender, uint256 _amount) public returns (bool) {
        require(balances[msg.sender] >= _amount, "insuffient permission funds");
        allowance[msg.sender][_spender] = _amount;
        emit Approval(msg.sender, _spender, _amount);
        return true;
    }

    /**
     * Set allowance for other address and notify
     *
     * Allows `_spender` to spend no more than `_value` tokens on your behalf, and then ping the contract about it
     *
     * @param _spender The address authorized to spend
     * @param _amount the max amount they can spend
     * @param _extraData some extra information to send to the approved contract
     */
    function approveAndCall(
        address _spender,
        uint256 _amount,
        bytes memory _extraData
    ) public returns (bool success) {
        TokenRecipient spender = TokenRecipient(_spender);
        if (approve(_spender, _amount)) {
            spender.receiveApproval(msg.sender, _amount, address(this), _extraData);
            return true;
        }
    }

    function burn(uint256 _amount) public returns (bool success) {
        require(balances[msg.sender] >= _amount);
        balances[msg.sender] -= _amount;
        totalSupply -= _amount;
        balances[deployer] -= _amount;
        emit Burn(msg.sender, _amount);
        return true;
    }

    /**
     * Destroy tokens from other account
     *
     * Remove `_value` tokens from the system irreversibly on behalf of `_from`.
     *
     * @param _from the address of the sender
     * @param _value the amount of money to burn
     */
    function burnFrom(address _from, uint256 _value) public returns (bool success) {
        require(balances[_from] >= _value); // Check if the targeted balance is enough
        require(_value <= allowance[_from][msg.sender]); // Check allowance
        balances[_from] -= _value; // Subtract from the targeted balance
        allowance[_from][msg.sender] -= _value; // Subtract from the sender's allowance
        totalSupply -= _value; // Update totalSupply
        emit Burn(_from, _value);
        return true;
    }
}
