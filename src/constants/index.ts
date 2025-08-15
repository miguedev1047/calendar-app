import { format, getDate, getMonth, getYear, addDays, subDays } from 'date-fns'
import type { CalendarEventModel, CalendarNoteModel } from '@/types'

export const now = new Date()

export const actualMonth = getMonth(now)
export const actualDay = getDate(now)
export const actualYear = getYear(now)

export const actualStrWeekday = format(now, 'EEEE')
export const actualStrMonth = format(now, 'MMMM')
export const actualStrYear = format(now, 'yyyy')

export const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Example Events
export const EXAMPLE_EVENTS: CalendarEventModel[] = [
  {
    id: 'event-1',
    title: 'Team Meeting',
    description: 'Weekly team sync to discuss project progress and upcoming tasks.',
    startDate: addDays(now, 1),
    endDate: addDays(now, 1),
    startTime: { hour: 9, minute: 0 },
    endTime: { hour: 10, minute: 30 },
    color: 'BLUE'
  },
  {
    id: 'event-2',
    title: 'Client Presentation',
    description: 'Present the new calendar application features to the client.',
    startDate: addDays(now, 3),
    endDate: addDays(now, 3),
    startTime: { hour: 14, minute: 0 },
    endTime: { hour: 15, minute: 30 },
    color: 'GREEN'
  },
  {
    id: 'event-3',
    title: 'Code Review Session',
    description: 'Review pull requests and discuss code improvements.',
    startDate: addDays(now, 5),
    endDate: addDays(now, 5),
    startTime: { hour: 11, minute: 0 },
    endTime: { hour: 12, minute: 0 },
    color: 'PURPLE'
  },
  {
    id: 'event-4',
    title: 'Project Planning',
    description: 'Plan the next sprint and assign tasks to team members.',
    startDate: addDays(now, 7),
    endDate: addDays(now, 7),
    startTime: { hour: 10, minute: 0 },
    endTime: { hour: 11, minute: 30 },
    color: 'ORANGE'
  },
  {
    id: 'event-5',
    title: 'Lunch with Sarah',
    description: 'Catch up over lunch at the new Italian restaurant downtown.',
    startDate: subDays(now, 2),
    endDate: subDays(now, 2),
    startTime: { hour: 12, minute: 30 },
    endTime: { hour: 14, minute: 0 },
    color: 'PINK'
  },
  {
    id: 'event-6',
    title: 'Doctor Appointment',
    description: 'Annual health checkup with Dr. Johnson.',
    startDate: addDays(now, 10),
    endDate: addDays(now, 10),
    startTime: { hour: 15, minute: 0 },
    endTime: { hour: 16, minute: 0 },
    color: 'RED'
  },
  {
    id: 'event-7',
    title: 'Morning Workout',
    description: 'Gym session focusing on cardio and strength training.',
    startDate: addDays(now, 2),
    endDate: addDays(now, 2),
    startTime: { hour: 7, minute: 0 },
    endTime: { hour: 8, minute: 30 },
    color: 'CYAN'
  },
  {
    id: 'event-8',
    title: 'Coffee with Alex',
    description: 'Casual coffee meeting to discuss the new startup idea.',
    startDate: addDays(now, 4),
    endDate: addDays(now, 4),
    startTime: { hour: 16, minute: 0 },
    endTime: { hour: 17, minute: 0 },
    color: 'YELLOW'
  },
  {
    id: 'event-9',
    title: 'Dentist Appointment',
    description: 'Regular dental cleaning and checkup.',
    startDate: addDays(now, 8),
    endDate: addDays(now, 8),
    startTime: { hour: 13, minute: 30 },
    endTime: { hour: 14, minute: 30 },
    color: 'PINK'
  },
  {
    id: 'event-10',
    title: 'Product Demo',
    description: 'Demonstrate the new features to the product team.',
    startDate: addDays(now, 12),
    endDate: addDays(now, 12),
    startTime: { hour: 10, minute: 0 },
    endTime: { hour: 11, minute: 0 },
    color: 'INDIGO'
  },
  {
    id: 'event-11',
    title: 'Birthday Party',
    description: "Celebrate Emma's 30th birthday at the rooftop bar.",
    startDate: addDays(now, 6),
    endDate: addDays(now, 6),
    startTime: { hour: 19, minute: 0 },
    endTime: { hour: 22, minute: 0 },
    color: 'FUCHSIA'
  },
  {
    id: 'event-12',
    title: 'Online Course',
    description: 'Advanced React patterns and performance optimization.',
    startDate: addDays(now, 9),
    endDate: addDays(now, 9),
    startTime: { hour: 18, minute: 0 },
    endTime: { hour: 20, minute: 0 },
    color: 'VIOLET'
  },
  {
    id: 'event-13',
    title: 'Grocery Shopping',
    description: 'Weekly grocery run and meal prep for the week.',
    startDate: subDays(now, 1),
    endDate: subDays(now, 1),
    startTime: { hour: 10, minute: 0 },
    endTime: { hour: 11, minute: 30 },
    color: 'GREEN'
  },
  {
    id: 'event-14',
    title: 'Car Service',
    description: 'Annual car maintenance and oil change.',
    startDate: addDays(now, 14),
    endDate: addDays(now, 14),
    startTime: { hour: 8, minute: 0 },
    endTime: { hour: 10, minute: 0 },
    color: 'ORANGE'
  },
  {
    id: 'event-15',
    title: 'Book Club Meeting',
    description: 'Monthly book club discussion about "The Design of Everyday Things".',
    startDate: addDays(now, 11),
    endDate: addDays(now, 11),
    startTime: { hour: 17, minute: 30 },
    endTime: { hour: 19, minute: 0 },
    color: 'PURPLE'
  },
  {
    id: 'event-16',
    title: 'Weekend Hiking',
    description: 'Nature hike at the Blue Ridge Mountains with friends.',
    startDate: addDays(now, 13),
    endDate: addDays(now, 13),
    startTime: { hour: 8, minute: 0 },
    endTime: { hour: 16, minute: 0 },
    color: 'BLUE'
  },
  {
    id: 'event-17',
    title: 'Business Conference',
    description: 'Annual tech conference with keynotes, workshops, and networking sessions.',
    startDate: addDays(now, 15),
    endDate: addDays(now, 17),
    startTime: { hour: 9, minute: 0 },
    endTime: { hour: 18, minute: 0 },
    color: 'INDIGO'
  },
  {
    id: 'event-18',
    title: 'Family Vacation',
    description: 'Beach vacation with the family at Myrtle Beach resort.',
    startDate: addDays(now, 20),
    endDate: addDays(now, 24),
    startTime: { hour: 10, minute: 0 },
    endTime: { hour: 20, minute: 0 },
    color: 'CYAN'
  },
  {
    id: 'event-19',
    title: 'Training Workshop',
    description: 'Intensive JavaScript and React training workshop for the development team.',
    startDate: addDays(now, 18),
    endDate: addDays(now, 20),
    startTime: { hour: 9, minute: 30 },
    endTime: { hour: 17, minute: 30 },
    color: 'PURPLE'
  },
  {
    id: 'event-20',
    title: 'Art Exhibition',
    description: 'Contemporary art exhibition opening and gallery tour downtown.',
    startDate: addDays(now, 25),
    endDate: addDays(now, 27),
    startTime: { hour: 14, minute: 0 },
    endTime: { hour: 21, minute: 0 },
    color: 'PINK'
  },
  {
    id: 'event-21',
    title: 'Hackathon Weekend',
    description: '48-hour coding competition to build innovative solutions for climate change.',
    startDate: addDays(now, 22),
    endDate: addDays(now, 24),
    startTime: { hour: 18, minute: 0 },
    endTime: { hour: 18, minute: 0 },
    color: 'GREEN'
  }
]

// Example Notes
export const EXAMPLE_NOTES: CalendarNoteModel[] = [
  {
    id: 'note-1',
    title: 'Project Ideas',
    description:
      '<h2>New Features to Implement</h2><ul><li>Dark mode toggle</li><li>Calendar export functionality</li><li>Mobile responsive design</li><li>Drag and drop for events</li></ul><p>These features would greatly improve user experience and make the app more competitive.</p>',
    color: 'BLUE',
    order: 1,
    createdAt: subDays(now, 5),
    updatedAt: subDays(now, 2)
  },
  {
    id: 'note-2',
    title: 'Meeting Notes - Jan 15',
    description:
      '<h2>Team Sync Meeting</h2><p><strong>Attendees:</strong> John, Sarah, Mike, Lisa</p><h3>Key Points:</h3><ul><li>Q1 goals review</li><li>Budget allocation for new tools</li><li>Hiring plan for frontend developer</li></ul><p><strong>Action Items:</strong></p><ul><li>John: Prepare budget proposal by Friday</li><li>Sarah: Schedule interviews for next week</li></ul>',
    color: 'GREEN',
    order: 2,
    createdAt: subDays(now, 3),
    updatedAt: subDays(now, 1)
  },
  {
    id: 'note-3',
    title: 'Recipe Collection',
    description:
      '<h2>Favorite Recipes</h2><h3>Pasta Carbonara</h3><p><strong>Ingredients:</strong></p><ul><li>400g spaghetti</li><li>200g pancetta</li><li>4 large eggs</li><li>100g Pecorino Romano</li><li>Black pepper</li></ul><p><strong>Instructions:</strong> Cook pasta al dente, crisp pancetta, mix eggs with cheese, combine everything off heat.</p>',
    color: 'YELLOW',
    order: 3,
    createdAt: subDays(now, 7),
    updatedAt: subDays(now, 4)
  },
  {
    id: 'note-4',
    title: 'Book Recommendations',
    description:
      '<h2>Must Read Books</h2><ul><li><strong>Clean Code</strong> by Robert Martin</li><li><strong>The Pragmatic Programmer</strong> by Andy Hunt</li><li><strong>Design Patterns</strong> by Gang of Four</li><li><strong>Atomic Habits</strong> by James Clear</li></ul><p>These books have been highly recommended by colleagues and have great reviews online.</p>',
    color: 'PURPLE',
    order: 4,
    createdAt: subDays(now, 10),
    updatedAt: subDays(now, 6)
  },
  {
    id: 'note-5',
    title: 'Travel Plans',
    description:
      '<h2>Summer Vacation Ideas</h2><h3>Europe Trip</h3><ul><li>Paris - 3 days</li><li>Rome - 4 days</li><li>Barcelona - 3 days</li></ul><p><strong>Budget:</strong> ~$3000 per person</p><p><strong>Best time:</strong> June-July</p><h3>Alternative: Japan</h3><ul><li>Tokyo - 5 days</li><li>Kyoto - 3 days</li><li>Osaka - 2 days</li></ul>',
    color: 'CYAN',
    order: 5,
    createdAt: subDays(now, 1),
    updatedAt: now
  },
  {
    id: 'note-6',
    title: 'Workout Routine',
    description:
      '<h2>Weekly Exercise Plan</h2><h3>Monday - Upper Body</h3><ul><li>Push-ups: 3x15</li><li>Pull-ups: 3x8</li><li>Bench press: 3x10</li></ul><h3>Wednesday - Lower Body</h3><ul><li>Squats: 3x12</li><li>Lunges: 3x10 each leg</li><li>Deadlifts: 3x8</li></ul><h3>Friday - Cardio</h3><ul><li>Running: 30 minutes</li><li>Cycling: 20 minutes</li></ul>',
    color: 'ORANGE',
    order: 6,
    createdAt: subDays(now, 14),
    updatedAt: subDays(now, 7)
  },
  {
    id: 'note-7',
    title: 'Learning Goals 2024',
    description:
      '<h2>Professional Development Plan</h2><h3>Technical Skills</h3><ul><li><strong>TypeScript Advanced Patterns</strong> - Complete by March</li><li><strong>System Design</strong> - Study distributed systems</li><li><strong>Docker & Kubernetes</strong> - Hands-on practice</li><li><strong>GraphQL</strong> - Build a full-stack project</li></ul><h3>Soft Skills</h3><ul><li>Public speaking - Join Toastmasters</li><li>Leadership - Take on team lead role</li><li>Mentoring - Guide 2 junior developers</li></ul><p><strong>Progress Tracking:</strong> Review monthly and adjust goals as needed.</p>',
    color: 'INDIGO',
    order: 7,
    createdAt: subDays(now, 8),
    updatedAt: subDays(now, 3)
  },
  {
    id: 'note-8',
    title: 'Home Improvement Tasks',
    description:
      '<h2>House Projects for Spring</h2><h3>Priority 1 - Urgent</h3><ul><li><strong>Fix leaky faucet</strong> in master bathroom</li><li><strong>Replace air filter</strong> - HVAC system</li><li><strong>Clean gutters</strong> - before rainy season</li></ul><h3>Priority 2 - Important</h3><ul><li>Paint living room walls - neutral colors</li><li>Install smart thermostat</li><li>Organize garage storage</li></ul><h3>Priority 3 - Nice to Have</h3><ul><li>Plant herb garden in backyard</li><li>Update kitchen cabinet handles</li><li>Install outdoor lighting</li></ul><p><strong>Budget:</strong> $2,500 allocated for all projects</p>',
    color: 'RED',
    order: 8,
    createdAt: subDays(now, 12),
    updatedAt: subDays(now, 5)
  }
]
