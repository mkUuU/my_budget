import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

const Login = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const { login, googleLogin, error } = useAuth();
 const navigate = useNavigate();

 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     await login(email, password);
     navigate('/dashboard');
   } catch (error) {
     console.error('Login failed:', error);
   }
 };

 const handleGoogleLogin = async () => {
   try {
     await googleLogin();
     navigate('/dashboard');
   } catch (error) {
     console.error('Google login failed:', error);
   }
 };

 return (
   <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
     <Card className="w-full max-w-md">
       <CardHeader>
         <CardTitle>Login</CardTitle>
         <CardDescription>Enter your credentials to access your account</CardDescription>
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
           <div className="space-y-2">
             <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
               <FontAwesomeIcon icon={faLock} className="mr-2" />
               Password
             </label>
             <Input
               type="password"
               id="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
             />
           </div>
           <Button type="submit" className="w-full">Login</Button>
         </form>
         <div className="mt-4">
           <Button onClick={handleGoogleLogin} variant="outline" className="w-full">
             <FontAwesomeIcon icon={faGoogle} className="mr-2" /> Login with Google
           </Button>
         </div>
         <p className="mt-4 text-sm text-center">
           Don't have an account? <a href="/register" className="text-primary hover:underline">Register here</a>
         </p>
       </CardContent>
     </Card>
   </div>
 );
};

export default Login;