import { createClient } from '@supabase/supabase-js';

class DBUtility {
  constructor() {
    this.supabase = createClient(
        'https://dmigsdtcgybqkeizrwnc.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtaWdzZHRjZ3licWtlaXpyd25jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEyNTM2OTAsImV4cCI6MjAxNjgyOTY5MH0.Vo0gwyHKGlAmCeu7DAHue-KI2Rt1HgZ7dp85jhE3NPY'
    );
  }

  async insertUserData(firstname, lastname, email, score) {
    try {
      const { data, error } = await this.supabase
        .from('TestDatabase1') // Replace 'users' with your table name
        .insert([{ firstname, lastname, email, score }]);
      
      if (error) {
        console.error('Error inserting data:', error);
        console.error('Server response:', error.response);
      } else {
        console.log('Data inserted successfully:', data);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  // Add other database operations as needed
}

export default new DBUtility();
