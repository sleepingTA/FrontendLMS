import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Course, ApiResponse } from '../../types';

// State type
interface CourseState {
  courses: Course[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedCourse: Course | null;
}


const initialState: CourseState = {
  courses: [],
  status: 'idle',
  error: null,
  selectedCourse: null,
};


export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async () => {
    const response = await axios.get<ApiResponse<Course[]>>('http://localhost:3000/api/courses');
    return response.data.data;
  }
);

export const fetchCourseById = createAsyncThunk(
  'courses/fetchCourseById',
  async (id: number) => {
    const response = await axios.get<ApiResponse<Course>>(`http://localhost:3000/api/courses/${id}`);
    return response.data.data;
  }
);

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    selectCourse: (state, action: PayloadAction<number>) => {
      state.selectedCourse = state.courses.find(course => course.id === action.payload) || null;
    },
    clearSelectedCourse: (state) => {
      state.selectedCourse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý fetchCourses
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
        state.status = 'succeeded';
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Không thể lấy dữ liệu khóa học';
      })
      // Xử lý fetchCourseById
      .addCase(fetchCourseById.fulfilled, (state, action: PayloadAction<Course>) => {
        state.selectedCourse = action.payload;
      });
  },
});

// Export actions và reducer
export const { selectCourse, clearSelectedCourse } = courseSlice.actions;
export default courseSlice.reducer;