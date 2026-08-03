export const SET_ACTIVE_SECTION = 'SET_ACTIVE_SECTION';
export const SAVE_SECTION_DATA = 'SAVE_SECTION_DATA';
export const MARK_SECTION_COMPLETE = 'MARK_SECTION_COMPLETE';
export const RESET_REGISTRATION = 'RESET_REGISTRATION';

export const setActiveSection = (sectionKey) => ({
  type: SET_ACTIVE_SECTION,
  payload: sectionKey,
});

export const saveSectionData = (sectionKey, data) => ({
  type: SAVE_SECTION_DATA,
  payload: { sectionKey, data },
});

export const markSectionComplete = (sectionKey) => ({
  type: MARK_SECTION_COMPLETE,
  payload: sectionKey,
});

export const resetRegistration = () => ({
  type: RESET_REGISTRATION,
});