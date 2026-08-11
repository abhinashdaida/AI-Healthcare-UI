// import React from "react";
// <<<<<<< HEAD:src/pages/Registration/Patient/Personal-Information/PersonalInformation.jsx
// import FormHeader from "../../../../shared/components/Registration/layout/FormHeader";
// import SiderBar from "../../../../shared/components/Registration/layout/SiderBar";
// import Footer from "../../../../shared/components/Registration/layout/Footer";
// =======
// import FormHeader from "../../../../shared/components/Patient/layout/FormHeader";
// import SiderBar from "../components/SiderBar/SiderBar";
// import Footer from "../../../../shared/components/Patient/layout/Footer";
// >>>>>>> 64f9a78 (create the basic detalis page and chnage the file path):src/pages/Registration/Patient/Personal-Information/Demo.jsx

// const PersonalInformation = () => {
//   const handleUpload = () => {
//     console.log("save btn click");
//   };

//   const handleSkip=()=>{
//     console.log("skip btn click");
//   }

//   const handleAutoSave=()=>{
//     console.log("auto save btn click");
//   }

//  const footerConfig = {
//    showSkipButton: true,
//    onSkipClick: handleSkip,

//    onAutoSaveClick: handleAutoSave,
   
//    primaryButtonLabel: "Upload & Continue",
//    onPrimaryClick: handleUpload,
//    primaryButtonDisabled: true,
//  };

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center p-3">
//       <div className="w-full max-w-350 bg-white flex min-h-172.5">
//         {/* Sidebar */}
//         <SiderBar />

//         {/* Main Content */}
//         <main className="flex-1 flex flex-col">
//           {/* Header */}
//           <FormHeader
//             title="Personal Information"
//             subtitle="Add your basic information to complete your profile and personalize your healthcare journey."
//           />

//           {/* Main Body */}
//           <div className="flex-1">{/* Your form content will come here */}</div>

//           {/* Footer */}
//           {/* pass the pros */}
//           <Footer config={footerConfig} />
//           {/* or line pass 
//           <Footer
//   config={{
//     primaryButtonLabel: "Upload & Continue",
//     onPrimaryClick: handleUpload,

//     showSkipButton: true,
//     onSkipClick: handleSkip,

//     showAutoSave: true,
//     onAutoSaveClick: handleAutoSave,
//   }}
// /> */}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default PersonalInformation;
