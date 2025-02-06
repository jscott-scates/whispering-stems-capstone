import { useState, useEffect } from "react"
import { Routes, Route, Outlet } from "react-router-dom"
import { Welcome } from "../components/Welcome/Welcome"
import { Navbar } from "../components/Navbar/Navbar"
import { FloretLibrary } from "../components/Flowers/FloretLibrary"
import { FlowerDetails } from "../components/Flowers/FlowerDetails"
import { About } from "../components/About/About"
import { CreateNewArrangement } from "../components/Forms/CreateNewArrangement"
import { ArrangementsList } from "../components/Arrangements/ArrangementsList"
import { ArrangementDetails } from "../components/Arrangements/ArrangementDetails"
import { Account } from "../components/Account/Account"
import { EditArrangementForm } from "../components/Forms/EditArrangementForm"
import { EditUserForm } from "../components/Forms/EditUserForm"


export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    const localWhisperingStemsUser = localStorage.getItem("whisperingStems_user")
    const whisperingStemsUserObj = JSON.parse(localWhisperingStemsUser)
    setCurrentUser(whisperingStemsUserObj)
  },[])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Outlet />
          </>
        }  
      >
         <Route index element={<Welcome  currentUser={currentUser}/>} />
         <Route path="about" element={<About />}/>
         <Route path="floret-library">
          <Route index element={<FloretLibrary />} />
          <Route path=":flowerId" element={<FlowerDetails />}/>
         </Route>
         
          <Route path="create-arrangement" element={<CreateNewArrangement currentUser={currentUser}/>}/>
       
         <Route path="arrangements">
            <Route index element={<ArrangementsList currentUser={currentUser}/>} />
            <Route path=":arrangementId" element={<ArrangementDetails currentUser={currentUser}/>} />
            <Route path=":arrangementId/edit-arrangement" element={<EditArrangementForm currentUser={currentUser}/>} />
         </Route>
         <Route path="account">
            <Route index element={<Account currentUser={currentUser} />}/>
            <Route path=":userId/edit-profile" element={<EditUserForm />} />
         </Route>  
      </Route>
     
    </Routes>
  )
}
