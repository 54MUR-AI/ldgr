// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataLogger {
    struct DataEntry {
        uint256 timestamp;
        string data;
    }

    DataEntry[] public entries;

    function logData(string memory data) public {
        entries.push(DataEntry(block.timestamp, data));
    }

    function getData(uint256 index) public view returns (uint256, string memory) {
        require(index < entries.length, "Index out of bounds");
        DataEntry storage entry = entries[index];
        return (entry.timestamp, entry.data);
    }

    function getEntriesCount() public view returns (uint256) {
        return entries.length;
    }
}
