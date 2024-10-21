"use client";
import CodeMirror, {
  EditorView,
  highlightActiveLine,
} from "@uiw/react-codemirror";
import { useState } from "react";
import { solidity } from "@replit/codemirror-lang-solidity";
const SolidityEditor = () => {
  const [code, setCode] = useState(`pragma solidity ^0.8.10;

contract EtherWallet {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    receive() external payable {}

    function withdraw(uint _amount) external {
        require(msg.sender == owner, "caller is not owner");
        payable(msg.sender).transfer(_amount);
    }

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
}`);

  const handleCodeChange = (value: any) => {
    setCode(value);
  };

  return (
    <div style={{ border: "1px solid black" }} className="w-full">
      <CodeMirror
        value={code}
        extensions={[solidity, EditorView.lineWrapping, highlightActiveLine()]}
        onChange={handleCodeChange}
        theme="dark" // You can use 'light' or 'dark' themes or customize it
      />
    </div>
  );
};

export default SolidityEditor;
