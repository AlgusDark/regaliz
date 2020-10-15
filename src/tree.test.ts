import { Tree } from "./tree";

test("Can create a Tree from an Array", () => {
  let fixtures = [
    {
      expected: [1, 2, 3, 4, 5, null, 6],
    },
    {
      expected: [1, 2, 3],
    },
    {
      expected: [1],
    },
  ];

  for (let index = 0; index < fixtures.length; index++) {
    let { expected } = fixtures[index];
    let tree = new Tree(expected);

    expect(tree.toArray()).toEqual(expect.arrayContaining(expected));
  }
});
