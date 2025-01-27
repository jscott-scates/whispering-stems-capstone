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


export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

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
         <Route index element={<Welcome />} />
         <Route path="about" element={<About />}/>
         <Route path="floret-library">
          <Route index element={<FloretLibrary />} />
          <Route path=":flowerId" element={<FlowerDetails />}/>
         </Route>
         <Route>
            <Route path="create-arrangement" element={<CreateNewArrangement currentUser={currentUser}/>}/>
         </Route>
         <Route path="arrangements">
            <Route index element={<ArrangementsList />} />
            <Route path=":arrangementId" element={<ArrangementDetails />} />
            <Route path=":arrangementId/edit-arrangement" element={<EditArrangementForm />} />
         </Route>
         <Route path="account" element={<Account currentUser={currentUser} />} />
      </Route>
     
    </Routes>
  )
}
