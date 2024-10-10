import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

const Register = () => {
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const { register, googleLogin, error } = useAuth();
 const navigate = useNavigate();

 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     await register(name, email);
     navigate('/dashboard');
   } catch (error) {
     console.error('Registration failed:', error);
   }
 };

 const handleGoogleRegister = async () => {
   try {
     await googleLogin();
     navigate('/dashboard');
   } catch (error) {
     console.error('Google registration failed:', error);
   }
 };

 return (
   <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
     <Card className="w-full max-w-md">
       <CardHeader>
         <CardTitle>Register</CardTitle>
         <CardDescription>Create a new account</CardDescription>
       </CardHeader>
       <CardContent>
         {error && (
           <Alert variant="destructive" className="mb-4">
             <AlertTitle>Error</AlertTitle>
             <AlertDescription>{error}</AlertDescription>
           </Alert>
         )}
         <form onSubmit={handleSubmit} className="space-y-4">
           <div className="space-y-2">
             <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
               <FontAwesomeIcon icon={faUser} className="mr-2" />
               Name
             </label>
             <Input
               type="text"
               id="name"
               value={name}
               onChange={(e) => setName(e.target.value)}
               required
             />
           </div>
           <div className="space-y-2">
             <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
               <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
               Email
             </label>
             <Input
               type="email"
               id="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
             />
           </div>
           <Button type="submit" className="w-full">Register</Button>
         </form>
         <div className="mt-4">
           <Button onClick={handleGoogleRegister} variant="outline" className="w-full">
             <FontAwesomeIcon icon={faGoogle} className="mr-2" /> Register with Google
           </Button>
         </div>
         <p className="mt-4 text-sm text-center">
           Already have an account? <a href="/login" className="text-primary hover:underline">Login here</a>
         </p>
         <p className="mt-2 text-sm text-center text-muted-foreground">
           Note: Your password will be set to 'user@123' by default.
         </p>
       </CardContent>
     </Card>
   </div>
 );
};

export default Register;