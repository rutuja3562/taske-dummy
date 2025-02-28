//-----------------------------------------------------------------------------------------------------------
// File: src/utils/modulo-utils.ts
//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------

export const isStateChangeFrom = (previousState?: string) => ({
  to: (state?: string) => ({
    equals: (expectedFromState: string) => ({
      to: (expectedToState: string) =>
        previousState === expectedFromState && state === expectedToState,
    }),
  }),
});

//-----------------------------------------------------------------------------------------------------------

export const hasReachedState = (expectedToState: string | string[]) => {
  let expectedFromState: string | string[] | undefined;
  let checkFromAnyState = false;

  return {
    fromState: (state: string | string[]) => {
      expectedFromState = state;
      return {
        values: (currentState?: string, previousState?: string) => {
          const expectedToStates = Array.isArray(expectedToState)
            ? expectedToState
            : [expectedToState];
          const expectedFromStates = Array.isArray(expectedFromState)
            ? expectedFromState
            : [expectedFromState];

          return (
            previousState !== undefined &&
            currentState !== undefined &&
            expectedFromStates.includes(previousState) &&
            expectedToStates.includes(currentState)
          );
        },
      };
    },
    fromAnyState: () => {
      checkFromAnyState = true;
      return {
        values: (currentState?: string, previousState?: string) => {
          const expectedToStates = Array.isArray(expectedToState)
            ? expectedToState
            : [expectedToState];
          return (
            checkFromAnyState &&
            currentState !== undefined &&
            expectedToStates.includes(currentState)
          );
        },
      };
    },
  };
};

//-----------------------------------------------------------------------------------------------------------
