'use client'

import { useState } from 'react'

import CustomerVerificationForm from '@/src/components/CustomerVerificationForm'
import CustomerRegistrationForm from '@/src/components/CustomerRegistrationForm'
import { VerifyCustomerResponse } from '@/src/backend'

const VerifyCustomer = () => {
  const [activeStep, setActiveStep] = useState(1)
  const [bvn, setBvn] = useState('')
  const [customerData, setCustomerData] = useState<
    VerifyCustomerResponse['data'] | null
  >(null)

  function goToNextStep() {
    setActiveStep(activeStep + 1)
  }

  function goToPrevStep() {
    setActiveStep(activeStep - 1)
  }

  function updateCustomerData(
    bvn: string,
    data: VerifyCustomerResponse['data']
  ) {
    setBvn(bvn)
    setCustomerData(data)
  }

  const contentToRender = (step: number) => {
    switch (step) {
      case 1:
        return (
          <CustomerVerificationForm
            activeStep={activeStep}
            goToNextStep={goToNextStep}
            updateCustomerData={updateCustomerData}
          />
        )
      case 2:
        return (
          <CustomerRegistrationForm
            activeStep={activeStep}
            bvn={bvn}
            goToPrevStep={goToPrevStep}
            customerData={customerData}
          />
        )
    }
  }

  return (
    <div className='h-full flex items-center justify-center bg-gray-100 px-4 lg:px-8'>
      {contentToRender(activeStep)}
    </div>
  )
}

export default VerifyCustomer
