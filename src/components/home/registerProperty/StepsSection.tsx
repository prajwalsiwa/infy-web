
function StepsSection() {
  return (
    <div className=" bg-blue-100">
      <div className="px-24">
        <div className="py-24">
          <div className="w-full">
            <div className="text-center text-2xl font-semibold text-blue-900">
              Steps to list your property
            </div>
            <div className="mt-6 flex-wrap flex lg:flex-nowrap gap-6">
              {/* Step 1 */}
              <div className="w-full lg:w-1/4 px-3">
                <div className="flex justify-start">
                  <button
                    type="button"
                    className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-blue-900 bg-blue-100 text-blue-900 text-lg font-bold"
                  >
                    1
                  </button>
                </div>
                <div className="mt-4 text-blue-900 text-xl font-semibold text-left">
                  Signup for Free
                </div>
                <div className="mt-3 text-base font-normal text-left">
                  Create your account for free through our website or mobile app
                </div>
              </div>
              {/* Step 2 */}
              <div className="w-full lg:w-1/4 px-3">
                <div className="flex justify-start">
                  <button
                    type="button"
                    className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-blue-900 bg-blue-100 text-blue-900 text-lg font-bold"
                  >
                    2
                  </button>
                </div>
                <div className="mt-4 text-blue-900 text-xl font-semibold text-left">
                  Fill up the Listing form
                </div>
                <div className="mt-3 text-base font-normal text-left">
                  Add photos, description, location etc as of the form
                </div>
              </div>
              {/* Step 3 */}
              <div className="w-full lg:w-1/4 px-3">
                <div className="flex justify-start">
                  <button
                    type="button"
                    className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-blue-900 bg-blue-100 text-blue-900 text-lg font-bold"
                  >
                    3
                  </button>
                </div>
                <div className="mt-4 text-blue-900 text-xl font-semibold text-left">
                  Wait for the approval
                </div>
                <div className="mt-3 text-base font-normal text-left">
                  We check and make sure everything is fine on your side
                </div>
              </div>
              {/* Step 4 */}
              <div className="w-full lg:w-1/4 px-3">
                <div className="flex justify-start">
                  <button
                    type="button"
                    className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-blue-900 bg-blue-100 text-blue-900 text-lg font-bold"
                  >
                    4
                  </button>
                </div>
                <div className="mt-4 text-blue-900 text-xl font-semibold text-left">
                  Accept new bookings
                </div>
                <div className="mt-3 text-base font-normal text-left">
                  Once the listing is approved, you are ready to accept the new
                  customers
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepsSection;
