import { createSlice } from "@reduxjs/toolkit";

export const playerInfoSlice = createSlice({
  name: "playerInfo",
  initialState: [
    {
      essence: { red: 4, blue: 4, black: 4, green: 4, gold: 4 },
      points: 3,
      income: {
        red: 2,
        blue: 2,
        black: 2,
        green: 2,
        gold: 2,
        any: [
          { source: "Sunken Reef", quantity: 2, exception: ["gold"] },
          { source: "Chalice of Life", quantity: 4, exception: ["green"] },
        ],
        /* set up an income modal that starts at the first "any" income. After the user
          makes his selection, then it moves to the next element in the any array. To do this,
          set the index at 0 then increase the index to 1 after the user makes the selection*/
      },
      anyIncomeIndex: 0,
      discounts: [{ type: "dragon", color: "any", quantity: 1, exception: [] }],
    },
    {
      essence: { red: 4, blue: 4, black: 4, green: 4, gold: 4 },
      points: 3,
      income: {
        red: 2,
        blue: 2,
        black: 2,
        green: 2,
        gold: 2,
        any: [],
      },
      anyIncomeIndex: 0,
      discounts: [
        { type: "any", color: "any", quantity: 4, exception: ["gold"] },
      ],
    },
  ],
  reducers: {
    increment: (state, { payload }) => {
      state[payload["playerNum"]][payload["essence"]] += 1;
    },
    decrement: (state, { payload }) => {
      state[payload["playerNum"]][payload["essence"]] -= 1;
    },
    firstPlayerPoint: (state, { payload }) => {
      if (
        payload.currentPlayer === 0 &&
        payload.turns.passed[1] === false &&
        payload.turns.firstPlayer !== 0
      ) {
        state[payload.currentPlayer].points++;
      }
      if (
        payload.currentPlayer === 1 &&
        payload.turns.passed[0] === false &&
        payload.turns.firstPlayer !== 1
      ) {
        state[payload.currentPlayer].points++;
      }
    },
    addEssence: (state, { payload }) => {
      /* add the essence to each player's essence in the state*/
      let addition = payload.addition;
      let cost = payload.cost;
      if (cost !== undefined) {
        for (let key in cost) {
          addition.push({ color: key, quantity: cost[key], exception: [] });
        }
      }
      for (let i = 0; i < addition.length; i++) {
        state[Number(payload.playerNum)].essence[addition[i].color] +=
          addition[i].quantity;
      }
    },
    addAnyEssence: (state, { payload }) => {
      /* add the essence to each player's essence in the state*/
      for (let key in payload.essenceDesired) {
        state[Number(payload.playerNum)].essence[key] +=
          payload.essenceDesired[key];
      }
    },
    subtractEssence: (state, { payload }) => {
      /* add the essence to each player's essence in the state*/
      const cost = payload.cost;
      for (let key in cost) {
        state[Number(payload.playerNum)].essence[key] -= payload.cost[key];
      }
    },
    subtractAnyEssence: (state, { payload }) => {
      for (let key in payload.essencePaid) {
        state[Number(payload.playerNum)].essence[key] -=
          payload.essencePaid[key];
      }
    },
    discardForEssence: (state, { payload }) => {
      for (let key in payload.essenceDesired) {
        state[Number(payload.playerNum)].essence[key] +=
          payload.essenceDesired[key];
      }
    },
    pointsOnPurchase: (state, { payload }) => {
      state[payload.currentPlayer].points += payload.monument.points;
    },
    gainGold: (state, { payload }) => {
      state[payload.currentPlayer].essence.gold++;
    },
    payForMonument: (state, { payload }) => {
      state[payload.currentPlayer].essence.gold -= 4;
    },
    addIncome: (state, { payload }) => {
      let incomeArray = payload.income;
      incomeArray.map((element) => {
        if (element.color === "any") {
          return state[payload.currentPlayer].income.any.push(element);
        } else {
          return (state[payload.currentPlayer].income[element.color] +=
            element.quantity);
        }
      });
    },
    incrementAnyIncomeIndex: (state, { payload }) => {
      state[payload.currentPlayer].anyIncomeIndex++;
    },
    setPlayerPoints: (state, { payload }) => {
      state[0].points = payload.p0playerPoints;
      state[1].points = payload.p1playerPoints;
    },

    // incrementByAmount: (state, {payload}) => state.playerInfo.payload['playerNum'].payload['essence'] += payload.amount,
    // decrementByAmount: (state, {payload}) => state.playerInfo.payload['playerNum'].payload['essence'] -= payload.amount,
    // setValue: (state, {payload}) => state.playerInfo.payload['playerNum'].payload['essence'] = payload.amount,
  },
});

export const {
  increment: increaseCounterActionCreator,
  decrement: decreaseCounterActionCreator,
  firstPlayerPoint,
  addEssence,
  subtractAnyEssence,
  subtractEssence,
  addAnyEssence,
  pointsOnPurchase,
  discardForEssence,
  gainGold,
  addIncome,
  payForMonument,
  incrementAnyIncomeIndex,
  setPlayerPoints,
  // incrementByAmount,
  // decrementByAmount,
  // setValue
} = playerInfoSlice.actions;

export default playerInfoSlice.reducer;
