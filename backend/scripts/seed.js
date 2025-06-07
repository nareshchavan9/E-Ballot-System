
const mongoose = require('mongoose');
const User = require('../models/User');
const Election = require('../models/Election');
require('dotenv').config();

// Sample data
const adminUser = {
  fullName: 'Admin User',
  email: process.env.ADMIN_EMAIL || 'admin@example.com',
  voterID: 'ADMIN001',
  password: process.env.ADMIN_PASSWORD || 'admin123',
  isVerified: true,
  role: 'admin'
};

const sampleUsers = [
  {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    voterID: 'VOT123456',
    password: 'password123',
    isVerified: true,
    role: 'voter'
  },
  {
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    voterID: 'VOT654321',
    password: 'password123',
    isVerified: true,
    role: 'voter'
  }
];

const sampleElections = [
  {
    title: 'City Mayor Election 2025',
    description: 'Vote for the next mayor of your city for the term 2025-2029. The elected mayor will be responsible for overseeing the city\'s budget, public services, and overall administration.',
    startDate: new Date('2025-06-01'),
    endDate: new Date('2025-06-03'),
    status: 'upcoming',
    candidates: [
      {
        name: 'Jane Smith',
        party: 'Progressive Party',
        bio: 'Current city council member with 8 years of experience. Focused on environmental sustainability and affordable housing.'
      },
      {
        name: 'Michael Johnson',
        party: 'Civic Alliance',
        bio: 'Business owner and community advocate. Priorities include economic development and public safety.'
      },
      {
        name: 'Patricia Williams',
        party: 'Unity Coalition',
        bio: 'Former school principal and nonprofit director. Passionate about education reform and social services.'
      }
    ]
  },
  {
    title: 'Community Board Election',
    description: 'Select representatives for the community board who will address local issues and make recommendations to city agencies.',
    startDate: new Date('2025-05-15'),
    endDate: new Date('2025-05-18'),
    status: 'active',
    candidates: [
      {
        name: 'Robert Chen',
        party: 'Independent',
        bio: 'Local business owner and longtime resident. Advocate for small businesses and neighborhood improvement.'
      },
      {
        name: 'Sarah Johnson',
        party: 'Community First',
        bio: 'Social worker with experience in community organizing. Focused on inclusive decision-making.'
      },
      {
        name: 'David Patel',
        party: 'Neighborhood Alliance',
        bio: 'Urban planner and volunteer. Interested in sustainable development and public spaces.'
      }
    ]
  },
  {
    title: 'School District Budget Vote',
    description: 'Vote on the proposed school district budget for 2025-2026.',
    startDate: new Date('2025-05-01'),
    endDate: new Date('2025-05-10'),
    status: 'completed',
    candidates: [
      {
        name: 'Approve Budget',
        party: 'Budget Plan A',
        bio: 'Approve the proposed budget with 3% increase in school funding and new technology initiatives.'
      },
      {
        name: 'Reject Budget',
        party: 'Budget Plan B',
        bio: 'Reject the proposed budget and request revisions with focus on maintaining current spending levels.'
      }
    ]
  }
];

const seedDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await User.deleteMany({});
    await Election.deleteMany({});
    
    console.log('Previous data cleared');
    
    // Create admin user
    const admin = new User(adminUser);
    await admin.save();
    console.log('Admin user created');
    
    // Create sample users
    await User.insertMany(sampleUsers);
    console.log('Sample users created');
    
    // Create elections with admin as creator
    const electionsWithAdmin = sampleElections.map(election => ({
      ...election,
      createdBy: admin._id
    }));
    
    await Election.insertMany(electionsWithAdmin);
    console.log('Sample elections created');
    
    console.log('Database seeding completed successfully');
    
    // Close connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
