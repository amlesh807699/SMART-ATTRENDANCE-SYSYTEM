Here’s a polished, professional, and detailed GitHub README for your AI-based attendance management system:

---

# AI-Based Attendance Management System

An intelligent **attendance management system** leveraging **AI facial recognition**, **Spring Boot**, **Next.js**, **MySQL**, and **Python** to automate and secure attendance tracking for online classes. The system prevents proxy attendance, ensures student authentication, and provides a seamless user experience for both teachers and students.

---

## 🚀 Features

* **Student Registration & Authentication**

  * Students register with roll number, password, and facial image.
  * Facial images securely stored in **Cloudinary**.
  * Passwords are securely hashed.

* **AI-Based Face Verification**

  * Python-based facial recognition verifies students before joining online sessions.
  * Prevents proxy attendance by ensuring the student’s identity.

* **Teacher Functionality**

  * Teachers can create classes with meeting URLs.
  * Attendance is automatically marked once the student verifies their face.

* **Secure Session Management**

  * JWT-based authentication for secure sessions.
  * HTTP-only cookies to prevent unauthorized access and session hijacking.

* **Cloud Integration**

  * Facial images stored on **Cloudinary** for efficient and secure access.
  * Seamless interaction between frontend, backend, and AI services.

---

## 🛠 Tech Stack

| Layer          | Technology                  |
| -------------- | --------------------------- |
| Backend        | Spring Boot, Java           |
| Frontend       | Next.js, React              |
| Database       | MySQL                       |
| AI Service     | Python (Facial Recognition) |
| Cloud Storage  | Cloudinary                  |
| Authentication | JWT, HTTP-only Cookies      |

---

## 📌 How It Works

1. **Student Registration**: Students register with credentials and a facial image.
2. **Face Storage & Processing**: Images are uploaded to Cloudinary and processed by the AI model.
3. **Class Creation**: Teachers create classes with meeting URLs.
4. **Attendance Verification**: Students verify their face via AI before joining the session.
5. **Secure Attendance Marking**: Attendance is automatically recorded only after successful verification.

---

## 🔒 Security

* **JWT Authentication** ensures that only authorized users can access resources.
* **HTTP-only cookies** protect session tokens from XSS attacks.
* **Encrypted passwords** prevent exposure of sensitive student data.
* **Facial recognition verification** ensures authenticity and prevents proxy attendance.

---

## 💻 Getting Started

### Prerequisites

* Java 17+
* Node.js 18+
* MySQL 8+
* Python 3.9+
* Cloudinary account

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/ai-attendance-system.git
cd ai-attendance-system
```

2. **Backend Setup (Spring Boot)**

```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

3. **Frontend Setup (Next.js)**

```bash
cd frontend
npm install
npm run dev
```

4. **Python Face Recognition Service**

```bash
cd face-recognition-service
pip install -r requirements.txt
python app.py
```

5. **Configure Environment Variables**

* `.env` for backend: Database credentials, JWT secret, Cloudinary API keys
* `.env` for frontend: API base URL

---

## 📂 Project Structure

```
├── backend                 # Spring Boot backend
├── frontend                # Next.js frontend
├── face-recognition-service # Python AI service
├── README.md
├── .env.example
```

---

## 🧪 Future Enhancements

* Real-time live face recognition during sessions
* Mobile app integration
* Detailed attendance analytics for teachers
* Multi-factor authentication for extra security

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name** – [GitHub Profile](https://github.com/yourusername)

---

I can also make a **super visually appealing version with badges, GIF workflow demo, and tables for quick API reference** if you want it to look *GitHub professional*.

Do you want me to create that enhanced version too?


# photos
registration with face
<img width="1898" height="911" alt="Screenshot 2026-03-18 202845" src="https://github.com/user-attachments/assets/77b891b4-c76a-41c5-82d9-a7d6baa7415a" />

login 
<img width="1890" height="909" alt="Screenshot 2026-03-18 202831" src="https://github.com/user-attachments/assets/a4afa417-bf1d-4dbc-8d9f-4419b8864965" />

home page
<img width="1895" height="906" alt="Screenshot 2026-03-18 202902" src="https://github.com/user-attachments/assets/8fe93057-6da2-4909-bf60-824333bc1c5a" />

dashboard
<img width="1891" height="909" alt="Screenshot 2026-03-18 202954" src="https://github.com/user-attachments/assets/14bcd57a-6fe0-429f-8543-b5932f8eaaa9" />

classes
<img width="1891" height="910" alt="Screenshot 2026-03-18 203011" src="https://github.com/user-attachments/assets/24353fab-1e6f-4dc4-9f01-cb14def7d738" />

join class
<img width="1916" height="915" alt="Screenshot 2026-03-18 203027" src="https://github.com/user-attachments/assets/c60be0f6-a2bd-482d-8763-b80f31d97d84" />
face verifaction for attendance
<img width="1888" height="906" alt="Screenshot 2026-03-18 203039" src="https://github.com/user-attachments/assets/c2c01e7f-437f-4eeb-a550-2f0ec29f0541" />
search class
<img width="1908" height="911" alt="Screenshot 2026-03-18 203054" src="https://github.com/user-attachments/assets/1e68ee73-f7d8-4c2b-8d78-4ba1311548c7" />

