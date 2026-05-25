// Seed script to create default admin
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://oluwasheun9721:Samuel9721@cluster0.xdahzzg.mongodb.net/hhgc?retryWrites=true&w=majority&appName=Cluster0";

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: "admin@hhgc.org" });

    if (existingAdmin) {
      console.log("Admin user already exists. Updating password...");
      const salt = await bcrypt.genSalt(12);
      existingAdmin.password = await bcrypt.hash("Admin@2024", salt);
      await existingAdmin.save({ validateBeforeSave: false });
      console.log("Admin password updated successfully!");
    } else {
      const admin = new Admin({
        name: "Church Admin",
        email: "admin@hhgc.org",
        password: "Admin@2024",
        role: "superadmin",
        isActive: true,
      });

      await admin.save();
      console.log("Default admin created successfully!");
    }

    console.log("Email: admin@hhgc.org");
    console.log("Password: Admin@2024");

    // Create some sample testimonies
    const Testimony = (await import("./models/Testimony.js")).default;

    const existingTestimonies = await Testimony.countDocuments();
    if (existingTestimonies === 0) {
      const sampleTestimonies = [
        {
          name: "Sarah Johnson",
          title: "God Restored My Marriage",
          testimony: "After years of struggling in my marriage, I came to HHGC and the community prayed with me. God miraculously restored our relationship and brought healing to our family. I am forever grateful for this church family.",
          role: "Member",
          rating: 5,
        },
        {
          name: "David Adeyemi",
          title: "From Addiction to Freedom",
          testimony: "I was bound by addiction for over 10 years. Through the prayers and support of the HHGC community, God delivered me completely. I am now 3 years clean and serving in the church.",
          role: "Volunteer",
          rating: 5,
        },
        {
          name: "Grace Okafor",
          title: "Healing After Loss",
          testimony: "When I lost my husband, I thought my life was over. The love and support from this church family helped me through the darkest season. God gave me beauty for ashes and joy for mourning.",
          role: "Deaconess",
          rating: 5,
        },
        {
          name: "Michael Chen",
          title: "A New Beginning in Christ",
          testimony: "I grew up without any faith. A friend invited me to HHGC and from the moment I walked in, I felt God's presence. I gave my life to Christ and everything changed. I now lead a small group.",
          role: "Small Group Leader",
          rating: 5,
        },
      ];

      await Testimony.insertMany(sampleTestimonies);
      console.log("Sample testimonies created!");
    }

    // Create some sample events
    const Event = (await import("./models/Event.js")).default;
    const existingEvents = await Event.countDocuments();
    if (existingEvents === 0) {
      const sampleEvents = [
        {
          title: "Sunday Worship Service",
          description: "Join us for an uplifting time of worship, praise, and the Word of God. Experience His presence in a powerful way.",
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          time: "9:00 AM - 12:00 PM",
          location: "Main Auditorium, HHGC",
          category: "worship",
          isFeatured: true,
        },
        {
          title: "Wednesday Bible Study",
          description: "Dive deeper into God's Word with us every Wednesday. This week we continue our series on the Book of Romans.",
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          time: "6:00 PM - 8:00 PM",
          location: "Fellowship Hall, HHGC",
          category: "fellowship",
          isFeatured: false,
        },
        {
          title: "Community Outreach Day",
          description: "Let's show God's love to our community! Join us as we distribute food, clothing, and share the Gospel with our neighbors.",
          date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          time: "10:00 AM - 3:00 PM",
          location: "Oshodi Community Center",
          category: "outreach",
          isFeatured: true,
        },
        {
          title: "Annual Women's Conference",
          description: "A transformative conference for women of all ages. Theme: Arise and Shine. Special guests, worship, and empowerment sessions.",
          date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
          time: "9:00 AM - 5:00 PM",
          location: "Main Auditorium, HHGC",
          category: "conference",
          isFeatured: true,
        },
      ];

      await Event.insertMany(sampleEvents);
      console.log("Sample events created!");
    }

    // Create some sample sermons
    const Sermon = (await import("./models/Sermon.js")).default;
    const existingSermons = await Sermon.countDocuments();
    if (existingSermons === 0) {
      const sampleSermons = [
        {
          title: "Walking in Faith",
          description: "In this powerful message, we explore what it means to walk by faith and not by sight. Learn practical steps to strengthen your faith journey.",
          speaker: "Pastor Adebayo",
          date: new Date(),
          category: "sunday",
          isFeatured: true,
          tags: ["faith", "trust", "obedience"],
        },
        {
          title: "The Power of Prayer",
          description: "Prayer is our direct line to God. Discover how to cultivate a powerful prayer life that moves mountains and transforms situations.",
          speaker: "Pastor Grace",
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          category: "sunday",
          isFeatured: false,
          tags: ["prayer", "spiritual warfare", "intercession"],
        },
        {
          title: "Finding Purpose in Christ",
          description: "God has a purpose and plan for your life. Learn how to discover and walk in the destiny God has designed specifically for you.",
          speaker: "Pastor Adebayo",
          date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          category: "sunday",
          isFeatured: false,
          tags: ["purpose", "destiny", "calling"],
        },
      ];

      await Sermon.insertMany(sampleSermons);
      console.log("Sample sermons created!");
    }

    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
