import 'dotenv/config';
import { PrismaClient } from '../../src/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';

let prismaInstance: PrismaClient | null = null;

function getPrismaClient(): PrismaClient | null {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return null;
  }
  if (!prismaInstance) {
    try {
      const adapter = new PrismaPg({ connectionString });
      prismaInstance = new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
      });
    } catch (err) {
      console.warn('Failed to initialize Prisma client with DATABASE_URL:', err);
      return null;
    }
  }
  return prismaInstance;
}

// In-memory fallback database for when DATABASE_URL is not set
const memoryDb: Record<string, any[]> = {
  student: [
    {
      id: 'std-101',
      internalSeq: 101,
      studentUid: 'BMI002S2',
      registrationNumber: 'BMI/UG-CS/226/001',
      studentNumber: 'BMI/UG-CS/226/001',
      career: 'UG',
      firstName: 'Alexander',
      lastName: 'Vance',
      email: 'alexander.vance@student.bmi.edu',
      phone: '+1 (555) 234-5678',
      dateOfBirth: '2003-05-14',
      nationalId: 'NAT-9982341',
      gender: 'Male',
      nationality: 'United States',
      program: 'B.Sc. Computer Science & AI',
      department: 'School of Computing',
      cohortYear: 2024,
      currentSemester: 4,
      academicStatus: 'Active',
      financialHold: false,
      academicHold: false,
      gpa: 3.88,
      cgpa: 3.82,
      creditsEarned: 64,
      creditsRequired: 120,
      advisorName: 'Dr. Elena Rostova',
      advisorEmail: 'e.rostova@bmi.edu',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      guardianName: 'Robert Vance',
      guardianRelation: 'Father',
      guardianPhone: '+1 (555) 987-6543',
      guardianEmail: 'r.vance@gmail.com',
      hostelRoom: 'Building B - Room 304',
      transportPass: 'BUS-PASS-2026-X8',
    },
    {
      id: 'std-102',
      internalSeq: 102,
      studentUid: 'BMI002S3',
      registrationNumber: 'BMI/UG-ENG/226/002',
      studentNumber: 'BMI/UG-ENG/226/002',
      career: 'UG',
      firstName: 'Sophia',
      lastName: 'Chen',
      email: 'sophia.chen@student.bmi.edu',
      phone: '+1 (555) 345-6789',
      dateOfBirth: '2004-09-22',
      nationalId: 'NAT-4412093',
      gender: 'Female',
      nationality: 'Canada',
      program: 'B.Eng. Robotics & Embedded Systems',
      department: 'School of Engineering',
      cohortYear: 2025,
      currentSemester: 2,
      academicStatus: 'Active',
      financialHold: false,
      academicHold: false,
      gpa: 3.95,
      cgpa: 3.91,
      creditsEarned: 32,
      creditsRequired: 130,
      advisorName: 'Prof. Marcus Brody',
      advisorEmail: 'm.brody@bmi.edu',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
      guardianName: 'Mei Chen',
      guardianRelation: 'Mother',
      guardianPhone: '+1 (555) 876-5432',
      guardianEmail: 'm.chen@gmail.com',
      hostelRoom: 'Building A - Room 108',
      transportPass: 'BUS-PASS-2026-Y2',
    }
  ],
  application: [
    {
      id: 'app-201',
      applicationNumber: 'ADM-2026-101',
      applicantName: 'Marcus Thorne',
      email: 'm.thorne@gmail.com',
      phone: '+1 (555) 111-2233',
      programApplied: 'B.Sc. Computer Science',
      career: 'UG',
      department: 'School of Computing',
      appliedDate: '2026-06-15',
      status: 'Submitted',
      highSchoolGPA: 3.85,
      testScore: 'SAT 1450',
      documents: [
        { name: 'High School Transcript', status: 'Pending' },
        { name: 'National ID Copy', status: 'Pending' }
      ]
    }
  ],
  course: [
    {
      id: 'crs-301',
      code: 'CSC301',
      title: 'Advanced Algorithms & Data Structures',
      credits: 4,
      department: 'School of Computing',
      instructorName: 'Dr. Elena Rostova',
      instructorId: 'stf-101',
      schedule: 'Mon, Wed 10:00 - 11:30 AM',
      room: 'Turing Hall 201',
      capacity: 40,
      enrolledCount: 28,
      prerequisites: ['CSC201'],
      description: 'In-depth study of algorithms, asymptotic analysis, dynamic programming, and graph theory.',
      syllabus: ['Asymptotic Notation', 'Divide & Conquer', 'Dynamic Programming', 'Graph Algorithms', 'NP-Completeness']
    },
    {
      id: 'crs-302',
      code: 'AI401',
      title: 'Deep Learning & Neural Networks',
      credits: 4,
      department: 'School of Computing',
      instructorName: 'Prof. Marcus Brody',
      instructorId: 'stf-102',
      schedule: 'Tue, Thu 02:00 - 03:30 PM',
      room: 'Ada Lovelace Lab 102',
      capacity: 35,
      enrolledCount: 30,
      prerequisites: ['CSC301', 'MTH202'],
      description: 'Hands-on deep learning covering perceptrons, CNNs, Transformers, and LLM fine-tuning.',
      syllabus: ['Perceptrons & Backpropagation', 'CNNs for Vision', 'Transformers & Attention', 'Generative Models']
    }
  ],
  feeInvoice: [
    {
      id: 'inv-401',
      invoiceNumber: 'INV-2026-001',
      studentId: 'std-101',
      term: 'Fall 2026',
      dueDate: '2026-09-01',
      issueDate: '2026-07-01',
      items: [
        { description: 'Tuition Fee - Fall 2026', amount: 6500 },
        { description: 'Technology & Lab Fee', amount: 450 },
        { description: 'Campus Library & Health Pass', amount: 200 }
      ],
      totalAmount: 7150,
      amountPaid: 7150,
      status: 'Paid',
      scholarshipDiscount: 1000
    }
  ],
  staffRecord: [
    {
      id: 'stf-101',
      staffNumber: 'STAFF-101',
      name: 'Dr. Elena Rostova',
      email: 'e.rostova@bmi.edu',
      department: 'School of Computing',
      title: 'Associate Professor',
      role: 'lecturer',
      teachingLoadCredits: 12,
      status: 'Active',
      salaryCategory: 'A2',
      joinedDate: '2019-08-15'
    }
  ],
  auditLog: [
    {
      id: 'log-1',
      timestamp: new Date().toISOString(),
      performedBy: 'System Admin',
      role: 'it_admin',
      action: 'System Boot Sequence',
      details: 'BMI University Management Portal online',
      ipAddress: '127.0.0.1',
      severity: 'Info'
    }
  ],
  libraryBook: [
    {
      id: 'bk-1',
      isbn: '978-0262033848',
      title: 'Introduction to Algorithms (4th Edition)',
      author: 'Thomas H. Cormen, Charles E. Leiserson',
      category: 'Computer Science',
      totalCopies: 10,
      availableCopies: 7,
      locationShelf: 'Shelf CS-04'
    }
  ],
  libraryLoan: [],
  advisingNote: [],
  alumniRecord: []
};

function createModelProxy(modelName: string) {
  return new Proxy({}, {
    get(_target, prop: string) {
      return async (...args: any[]) => {
        const realClient = getPrismaClient();
        if (realClient && (realClient as any)[modelName]) {
          try {
            return await (realClient as any)[modelName][prop](...args);
          } catch (err) {
            console.warn(`Prisma model ${modelName}.${prop} failed, falling back to memory db:`, err);
          }
        }

        // Memory fallback implementation
        const store = memoryDb[modelName] || [];

        if (prop === 'findMany') {
          const query = args[0] || {};
          let results = [...store];
          if (query.where?.studentId) {
            results = results.filter(item => item.studentId === query.where.studentId);
          }
          return results;
        }

        if (prop === 'findUnique' || prop === 'findFirst') {
          const query = args[0] || {};
          if (query.where?.id) {
            return store.find(item => item.id === query.where.id) || null;
          }
          if (query.where?.studentUid) {
            return store.find(item => item.studentUid === query.where.studentUid) || null;
          }
          if (query.where?.registrationNumber) {
            return store.find(item => item.registrationNumber === query.where.registrationNumber) || null;
          }
          return store[0] || null;
        }

        if (prop === 'count') {
          return store.length;
        }

        if (prop === 'create') {
          const data = args[0]?.data || {};
          const newItem = { id: `${modelName}-${Date.now()}`, ...data };
          store.unshift(newItem);
          return newItem;
        }

        if (prop === 'update') {
          const { where, data } = args[0] || {};
          const index = store.findIndex(item => item.id === where?.id);
          if (index !== -1) {
            store[index] = { ...store[index], ...data };
            return store[index];
          }
          return { id: where?.id, ...data };
        }

        if (prop === 'delete') {
          const { where } = args[0] || {};
          const index = store.findIndex(item => item.id === where?.id);
          if (index !== -1) {
            const removed = store.splice(index, 1)[0];
            return removed;
          }
          return { id: where?.id };
        }

        if (prop === 'upsert') {
          const { where, create: createData, update: updateData } = args[0] || {};
          const existing = store.find(item => item.id === where?.id);
          if (existing) {
            Object.assign(existing, updateData);
            return existing;
          }
          const newItem = { id: where?.id || `${modelName}-${Date.now()}`, ...createData };
          store.unshift(newItem);
          return newItem;
        }

        return null;
      };
    }
  });
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop: string) {
    if (prop === '$connect' || prop === '$disconnect') {
      return async () => {};
    }
    return createModelProxy(prop);
  }
});
