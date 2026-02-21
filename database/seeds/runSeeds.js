const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: '/home/pra/Desktop/dbms_project_gemini/backend/.env' });
const pool = new Pool({
  user: process.env.DB_USER || 'glas_user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'copy',
  password: process.env.DB_PASSWORD || 'password123',
  port: process.env.DB_PORT || 5432,
});

const runSeeds = async () => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    console.log('🌱 Starting seed process...');

    // 1. Create Users
    console.log('Creating users...');
    const saltRounds = 10;
    const adminPass = await bcrypt.hash('admin123', saltRounds);
    const teacherPass = await bcrypt.hash('teacher123', saltRounds);
    const studentPass = await bcrypt.hash('student123', saltRounds);

    const usersQuery = `
      INSERT INTO users (username, email, password_hash, role, bio, is_active)
      VALUES 
      ('admin', 'admin@glas.edu', $1, 'admin', 'System Administrator', true),
      ('teacher', 'teacher@glas.edu', $2, 'teacher', 'Head of Computer Science', true),
      ('student1', 'student1@glas.edu', $3, 'student', 'Eager to learn magic.', true),
      ('student2', 'student2@glas.edu', $3, 'student', 'Stealthy coder.', true),
      ('student3', 'student3@glas.edu', $3, 'student', 'Strong willed developer.', true)
      RETURNING id, role, username;
    `;
    
    const usersResult = await client.query(usersQuery, [adminPass, teacherPass, studentPass]);
    const users = usersResult.rows;
    const adminUser = users.find(u => u.role === 'admin');
    const teacherUser = users.find(u => u.role === 'teacher');
    const students = users.filter(u => u.role === 'student');

    // 2. Insert Admin Details
    console.log('Creating admin details...');
    await client.query(`
      INSERT INTO admins (user_id, full_name, role_level, department, permissions)
      VALUES ($1, 'System Admin', 'super_admin', 'IT', '{"all": true}')
    `, [adminUser.id]);

    // 3. Insert Teacher Details
    console.log('Creating teacher details...');
    const teacherResult = await client.query(`
      INSERT INTO teachers (user_id, full_name, title, department, specialization, bio)
      VALUES ($1, 'Prof. Albus Dumbledore', 'Professor', 'Computer Science', 'Algorithms', 'Master of the coding arts.')
      RETURNING id;
    `, [teacherUser.id]);
    const teacherId = teacherResult.rows[0].id;

    // 4. Get Class and Race IDs
    const classesRes = await client.query('SELECT id, name FROM rpg_classes');
    const racesRes = await client.query('SELECT id, name FROM races');
    const levelsRes = await client.query('SELECT id, display_name FROM academic_levels');
    
    const mageId = classesRes.rows.find(c => c.name === 'Mage').id;
    const rogueId = classesRes.rows.find(c => c.name === 'Rogue').id;
    const warriorId = classesRes.rows.find(c => c.name === 'Warrior').id;
    
    const humanId = racesRes.rows.find(r => r.name === 'Human').id;
    const elfId = racesRes.rows.find(r => r.name === 'Elf').id;
    const dwarfId = racesRes.rows.find(r => r.name === 'Dwarf').id;
    
    const freshmanId = levelsRes.rows.find(l => l.display_name === 'Freshman Fall').id;

    // 5. Insert Student Details
    console.log('Creating student profiles...');
    const studentIds = [];
    
    // Student 1 (Mage Human)
    const s1Res = await client.query(`
      INSERT INTO students (user_id, character_name, class_id, race_id, academic_level_id, intelligence, wisdom)
      VALUES ($1, 'Merlin', $2, $3, $4, 16, 14) RETURNING id
    `, [students[0].id, mageId, humanId, freshmanId]);
    studentIds.push(s1Res.rows[0].id);

    // Student 2 (Rogue Elf)
    const s2Res = await client.query(`
      INSERT INTO students (user_id, character_name, class_id, race_id, academic_level_id, dexterity, charisma)
      VALUES ($1, 'Legolas', $2, $3, $4, 16, 12) RETURNING id
    `, [students[1].id, rogueId, elfId, freshmanId]);
    studentIds.push(s2Res.rows[0].id);

    // Student 3 (Warrior Dwarf)
    const s3Res = await client.query(`
      INSERT INTO students (user_id, character_name, class_id, race_id, academic_level_id, strength, constitution)
      VALUES ($1, 'Gimli', $2, $3, $4, 16, 16) RETURNING id
    `, [students[2].id, warriorId, dwarfId, freshmanId]);
    studentIds.push(s3Res.rows[0].id);

    // 6. Create Courses
    console.log('Creating courses...');
    const coursesQuery = `
      INSERT INTO courses (code, name, description, teacher_id, credits, semester, year)
      VALUES 
      ('CS101', 'Intro to Wizardry (Programming)', 'Basic spells and loops.', $1, 3, 'Fall', 2024),
      ('CS201', 'Data Structures & Potions', 'Advanced storage techniques.', $1, 4, 'Fall', 2024),
      ('MATH101', 'Arithmancy (Calculus)', 'Magical numbers.', $1, 3, 'Fall', 2024)
      RETURNING id, code;
    `;
    const coursesResult = await client.query(coursesQuery, [teacherId]);
    const courses = coursesResult.rows;

    // 7. Enroll Students
    console.log('Enrolling students...');
    for (const sId of studentIds) {
      for (const course of courses) {
        await client.query(`
          INSERT INTO student_skills (student_id, course_id, skill_level, current_xp)
          VALUES ($1, $2, 1, 0)
        `, [sId, course.id]);
      }
    }

    // 8. Create Quests
    console.log('Creating quests...');
    const cs101 = courses.find(c => c.code === 'CS101');
    await client.query(`
      INSERT INTO quests (course_id, teacher_id, title, description, quest_type, difficulty, xp_reward, due_date, is_published)
      VALUES 
      ($1, $2, 'Hello World Spell', 'Write your first program.', 'main', 'easy', 50, NOW() + INTERVAL '7 days', true),
      ($1, $2, 'Loop of Infinity', 'Master the while loop.', 'daily', 'medium', 75, NOW() + INTERVAL '3 days', true)
    `, [cs101.id, teacherId]);

    // 9. Create Guilds
    console.log('Creating guilds...');
    const guildRes = await client.query(`
      INSERT INTO guilds (name, description, guild_master_id, guild_type)
      VALUES ('The Order of the Pixel', 'A guild for frontend wizards.', $1, 'Technical')
      RETURNING id
    `, [studentIds[0]]);
    
    await client.query(`
      INSERT INTO guild_memberships (guild_id, student_id, role)
      VALUES ($1, $2, 'guild_master')
    `, [guildRes.rows[0].id, studentIds[0]]);

    // 10. Assign Rituals
    console.log('Assigning rituals...');
    const ritualsRes = await client.query('SELECT id FROM rituals LIMIT 3');
    for (const sId of studentIds) {
      for (const rit of ritualsRes.rows) {
        await client.query(`
          INSERT INTO student_rituals (student_id, ritual_id) VALUES ($1, $2)
        `, [sId, rit.id]);
      }
    }

    await client.query('COMMIT');
    console.log('✅ Seeding completed successfully!');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Seeding failed:', error);
  } finally {
    client.release();
    await pool.end();
  }
};

runSeeds();
