import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';

// Submit teacher verification documents
export const submitTeacherVerification = async (teacherId, documents, token) => {
  // documents: Array of { documentType, documentUrl }
  return axios.post(
    `${API_BASE_URL}/teachers/${teacherId}/verification`,
    documents,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Update teacher profile
export const updateTeacherProfile = async (teacherId, profileData, token) => {
  return axios.put(
    `${API_BASE_URL}/teachers/${teacherId}`,
    profileData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
