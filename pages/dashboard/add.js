import React, { useState } from 'react'
import { useRouter } from 'next/router'

import FullScreenFormModal from '~/components/formComponents/fullScreenFormModal'

const AddClimb = (addItem) => {
  const [modalOpen, setModalOpen] = useState(true)

  return (
    <div>Add Climb</div>
    // <FullScreenFormModal
    //   open={modalOpen}
    //   onClose={() => setModalOpen(false)}
    //   addItem={addItem}
    // />
  )
}



export default AddClimb