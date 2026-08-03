export const getActiveSectionKey = (state) => state.registration.activeSectionKey;

export const getSectionData = (state, sectionKey) =>
  state.registration.formDataBySection[sectionKey] || {};

export const getCompletedSections = (state) => state.registration.completedSections;

export const isSectionComplete = (state, sectionKey) =>
  state.registration.completedSections.includes(sectionKey);