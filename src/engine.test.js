import { expect } from "chai";
import { next, parse } from "./engine";
const _ = false;
const o = true;
describe("next", () => {
  it("should return all dead cells given all dead cells", () => {
    expect(
      next([
        [_, _, _],
        [_, _, _],
        [_, _, _],
      ])
    ).to.deep.equal([
      [_, _, _],
      [_, _, _],
      [_, _, _],
    ]);
  });

  it("should be dead if there is no neighbours", () => {
    const result = next([
      [_, _, _],
      [_, o, _],
      [_, _, _],
    ]);
    expect(result[1][1]).to.equal(false);
  });

  it("should be dead if there are four or more neighbours", () => {
    const result = next([
      [o, _, o],
      [_, o, o],
      [o, o, _],
    ]);
    expect(result[1][1]).to.equal(false);
  });

  it("should be dead if there are four or more neighbours #2", () => {
    const result = next([
      [o, _, o],
      [o, o, o],
      [_, o, _],
    ]);
    expect(result[1][1]).to.equal(false);
    expect(result[2][0]).to.equal(true);
  });

  it("should survive if there are 2 or 3 neighbours", () => {
    const result = next([
      [_, _, o],
      [_, o, o],
      [o, _, _],
    ]);
    expect(result[1][1]).to.equal(true);
    expect(result[1][2]).to.equal(true);
  });

  it("for empty cell, it should become populated if there are 3 neighbours", () => {
    const result = next([
      [_, _, o],
      [_, _, o],
      [o, _, _],
    ]);
    expect(result[1][1]).to.equal(true);
    expect(result[0][2]).to.equal(false);
  });

  it("for empty cell, it should become populated if there are 3 neighbours", () => {
    const result = next([
      [_, _, o, _, _, o],
      [_, o, o, _, _, _],
      [o, _, _, _, o, _],
      [_, _, o, _, _, o],
      [_, _, _, _, _, _],
      [o, _, _, _, _, _],
    ]);
    expect(result[5][5]).to.equal(false);
    expect(result[2][1]).to.equal(false);
    expect(result[2][2]).to.equal(true);
  });
});

describe("parse", () => {
  it("should return [] given ''", () => {
    expect(parse("")).to.deep.equal([]);
  });
  it("should parse O as true and . as false", () => {
    expect(parse("...\n.O.\n...\n")).to.deep.equal([
      [_, _, _],
      [_, o, _],
      [_, _, _],
    ]);
  });
  it("should parse O as true and . as false", () => {
    expect(parse("...0\n.00.\n..0.\n0...\n")).to.deep.equal([
      [_, _, _, o],
      [_, o, o, _],
      [_, _, o, _],
      [o, _, _, _],
    ]);
  });
});
