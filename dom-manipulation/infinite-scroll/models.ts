interface Testimonial {
  message: string;
  id: string;
}

interface TestimonialsResponse {
  testimonials: Testimonial[];
  hasNext: boolean;
}
