// SPDX-License-Identifier: GPL-3.0


pragma solidity >=0.8.2 <0.9.0;

contract Upload
{
    struct Access{
        address user;
        bool access; //true or false
    }
    struct Share{
        address user;
        string url;
        uint index;
        uint status;
    }
    uint k=0;
    //now implementing a function to check the status of verification requests sent by the user.
    mapping(address=>Share [ ]) requests;
    address[] addreq;

    //images stored by the user
    //urls of images stored by the user 
    mapping(address=>string [ ]) value;

    mapping(address=>Access[]) accessList;
    //no server is being is used
    //so previous state is also stored here
    mapping(address=>mapping(address=>bool)) previousData;
    //tells the ownership it also gives true and false
    mapping(address=>mapping(address=>bool)) ownership;

    function compareStrings(string memory a, string memory b) public pure returns (bool) {
    return keccak256(bytes(a)) == keccak256(bytes(b));
}

    function add(address _user,string memory url) external{
        bool check=false;
        for(uint i=0;i<value[_user].length;i++)
        {
            string memory c=string(value[_user][i]);
            if(compareStrings(c, url))
            {
                check=true;
                break;
            }
        }
        if(check==false)
            value[_user].push(url);
    }
    function allow(address user) public{
        //giving access
        ownership[msg.sender][user]=true;
        if(previousData[msg.sender][user])
        {
            for(uint i=0;i<accessList[msg.sender].length;i++)
            {
                if(accessList[msg.sender][i].user==user)
                    accessList[msg.sender][i].access=true;
            }
        }
        else {
            accessList[msg.sender].push(Access(user,true));
            previousData[msg.sender][user]=true;
        }
    }
    function disallow(address user) public {
        ownership[msg.sender][user]=false;
        //here the addresss from accesslist needs to be removed;
        for(uint i=0;i<accessList[msg.sender].length;i++)
        {
            if(accessList[msg.sender][i].user==user){
                accessList[msg.sender][i].access=false;

            }
        }
    }

    function display(address _user) external view returns(string [] memory){
        require(_user==msg.sender || ownership[_user][msg.sender],"You don't have access");
        return value[_user];
    }

    