export interface Course {
  id: number;
  title: string;
  description: string;
  category_id: number;
  created_by: number;
  price: string;
  discount_percentage: string;
  discounted_price: string;
  thumbnail_url: string | null;
  views: number;
  total_students: number;
  rating: string;
  total_ratings: number;
  is_active: number;
  created_at: string;
  updated_at: string;
  category_name: string;
  lesson_count: number;
  total_videos: number;
  total_materials: number;
}
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}
  export interface Lesson {
    id: number;
    course_id: number;
    title: string;
    order_number: number;
    video_count: number;
    material_count: number;
  }
  
  export interface CourseDetail extends Course {
    lessons: Lesson[];
  }
  
  export interface CreateCourseResponse {
    success: boolean;
    message: string;
    data: {
      courseId: number;
      thumbnail_url: string | null;
    };
  }
  
  export interface AddContentResponse {
    success: boolean;
    message: string;
    data: {
      videoId?: number;
      materialId?: number;
      videoUrl?: string;
      fileUrl?: string;
    };
  }