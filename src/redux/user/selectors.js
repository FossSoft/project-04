export const selectUserId = state => state.user.userId;

export const selectUserName = state => state.user.name;

export const selectUserEmail = state => state.user.email;

export const selectUserGender = state => state.user.gender;

export const selectUserWeight = state => state.user.weight;

export const selectUserActivityTime = state => state.user.activeParticipationTime;

export const selectUserWaterToDrink = state => state.user.waterToDrink;

export const selectUserWaterData = state => state.user.waterData;

export const selectUserMonthlyWaterData = state => state.user.monthlyWaterData;

export const selectIsLoading = state => state.user.isLoading;

export const selectUserError = state => state.user.error;
