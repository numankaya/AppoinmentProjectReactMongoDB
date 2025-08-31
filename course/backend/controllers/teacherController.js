import teacherModel from "../models/teacherModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { teacherId } = req.body;

    const teacherData = await teacherModel.findById(teacherId);
    await teacherModel.findByIdAndUpdate(teacherId, {
      available: !teacherData.available,
    });
    res.json({ success: true, message: "Availability Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const teacherList = async (req, res) => {
  try {
    const teachers = await teacherModel
      .find({})
      .select(["-password", "-email"]);

    res.json({ success: true, teachers });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for teacher login
const loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacher = await teacherModel.findOne({ email });

    if (!teacher) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);

    if (isMatch) {
      const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET);

      res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get teacher appointments for teacher panel
const appointmentsTeacher = async (req, res) => {
  try {
    const { teacherId } = req.body;
    const appointments = await appointmentModel.find({ teacherId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to mark appointment completed for teacher panel
const appointmentComplete = async (req, res) => {
  try {
    const { teacherId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.teacherId === teacherId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Appointment Completed" });
    } else {
      return res.json({ success: false, message: "Mark Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment for teacher panel
const appointmentCancel = async (req, res) => {
  try {
    const { teacherId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.teacherId === teacherId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment Cancelled" });
    } else {
      return res.json({ success: false, message: "Cancellation Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get dashboard data for teacher panel
const teacherDashboard = async (req, res) => {
  try {
    const { teacherId } = req.body;

    const appointments = await appointmentModel.find({ teacherId });

    let earnings = 0;

    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let students = [];

    appointments.map((item) => {
      if (!students.includes(item.userId)) {
        students.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      students: students.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get teacher profile for teacher panel
const teacherProfile = async (req, res) => {
  try {
    const { teacherId } = req.body;
    const profileData = await teacherModel
      .findById(teacherId)
      .select("-password");

    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update teacher profile data from Teacher Panel
const updateTeacherProfile = async (req, res) => {
  try {
    const { teacherId, fees, address, available } = req.body;

    await teacherModel.findByIdAndUpdate(teacherId, {
      fees,
      address,
      available,
    });

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  changeAvailability,
  teacherList,
  loginTeacher,
  appointmentsTeacher,
  appointmentCancel,
  appointmentComplete,
  teacherDashboard,
  teacherProfile,
  updateTeacherProfile,
};
