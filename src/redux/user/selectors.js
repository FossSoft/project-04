export const selectUserId = state => state.user.userId;
export const selectAvatar = state => state.user.avatar;
export const selectUserName = state => state.user.name;

export const selectUserEmail = state => state.user.email;

export const selectUserGender = state => state.user.gender;

export const selectUserAvatar = state => state.user.avatar;

export const selectUserWeight = state => state.user.weight;

export const selectUserActivityTime = state => state.user.activityTime;

export const selectUserWaterToDrink = state => state.user.dailyNorma;

export const selectUserWaterData = state => state.user.waterData;

export const selectUserMonthlyWaterData = state => state.user.monthlyWaterData;

export const selectIsLoading = state => state.user.isLoading;

export const selectUserError = state => state.user.error;
