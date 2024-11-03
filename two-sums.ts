function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>(); // Initialize a map to store values and their indices.

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]; // Calculate the complement.

    // Check if the complement is already in the map.
    if (map.has(complement)) {
      // If found, return the indices.
      return [map.get(complement) as number, i];
    }

    // If not found, add the current number and its index to the map.
    map.set(nums[i], i);
  }

  throw new Error('No two sum solution');
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 13)); // Output: [0, 2]
console.log(twoSum([3, 2, 4], 6)); // Output: [1, 2]
console.log(twoSum([3, 3], 6)); // Output: [0, 1]
