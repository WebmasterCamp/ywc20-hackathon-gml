const emailRegex = /^[a-zA-Z0-9\u0E00-\u0E7F._-]+@[a-zA-Z0-9\u0E00-\u0E7F.-]+\.([a-zA-Z]{2,}|\u0E44\u0E17\u0E22)$/;
const testEmails = [
  'test@example.com',
  'user@gmail.com', 
  'cojoin@โคจร.ไทย',
  'ทดสอบ@โดเมน.ไทย',
  'user@abc.th'
];

console.log('Testing email regex:');
testEmails.forEach(email => {
  const isValid = emailRegex.test(email);
  console.log(`${email}: ${isValid ? 'VALID' : 'INVALID'}`);
});