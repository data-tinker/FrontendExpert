// Mock data: An array of 20 testimonials
const mockTestimonials: Testimonial[] = Array.from({ length: 20 }, (_, index) => ({
  message: `Testimonial message ${index + 1}`,
  id: `t${index + 1}`
}));

export const getTestimonials = (limit: number, after?: string): TestimonialsResponse => {
  let startIndex = 0;

  // Find the index of the 'after' testimonial, if provided
  if (after) {
    const afterIndex = mockTestimonials.findIndex(t => t.id === after);
    if (afterIndex !== -1) {
      startIndex = afterIndex + 1;
    }
  }

  const endIndex = startIndex + limit;
  const selectedTestimonials = mockTestimonials.slice(startIndex, endIndex);

  return {
    testimonials: selectedTestimonials,
    hasNext: endIndex < mockTestimonials.length
  };
};
