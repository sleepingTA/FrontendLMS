import React from 'react'

const LoginPage = () => {
  return (
        <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
            <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
                <div>
                <h2 className="lg:text-5xl text-5xl font-bold lg:leading-[57px] text-slate-900">
                    Seamless Login for Exclusive Access
                </h2>
                <p className="text-sm mt-6 text-slate-500 leading-relaxed">Immerse yourself in a hassle-free login journey with our intuitively designed login form. Effortlessly access your account.</p>
                <p className="text-sm mt-12 text-slate-500">Don't have an account <a href="javascript:void(0);" className="text-blue-600 font-medium hover:underline ml-1">Register here</a></p>
                </div>

                <form className="max-w-md md:ml-auto w-full">
                <h3 className="text-slate-900 lg:text-3xl text-2xl font-bold mb-8">
                    Sign in
                </h3>

                <div className="space-y-6">
                    <div>
                    <label className='text-sm text-slate-800 font-medium mb-2 block'>Email</label>
                    <input name="email" type="email" required className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-0 border border-gray-200 focus:border-blue-600 focus:bg-transparent" placeholder="Enter Email" />
                    </div>
                    <div>
                    <label className='text-sm text-slate-800 font-medium mb-2 block'>Password</label>
                    <input name="password" type="password" required className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-0 border border-gray-200 focus:border-blue-600 focus:bg-transparent" placeholder="Enter Password" />
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center">
                        
                    </div>
                    <div className="text-sm">
                        <a href="jajvascript:void(0);" className="text-blue-600 hover:text-blue-500 font-medium">
                        Forgot your password?
                        </a>
                    </div>
                    </div>
                </div>

                <div className="!mt-12">
                    <button type="button" className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer">
                    Log in
                    </button>
                </div>

                <div className="my-4 flex items-center gap-4">
                    <hr className="w-full border-slate-300" />
                    <p className="text-sm text-slate-800 text-center">or</p>
                    <hr className="w-full border-slate-300" />
                </div>

                <div className="space-x-6 flex justify-center">
                    <button type="button"
                    className="border-0 outline-0 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 512 512">
                        <path fill="#fbbd00" d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z" data-original="#fbbd00" />
                        <path fill="#0f9d58" d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z" data-original="#0f9d58" />
                        <path fill="#31aa52" d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z" data-original="#31aa52" />
                        <path fill="#3c79e6" d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z" data-original="#3c79e6" />
                        <path fill="#cf2d48" d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z" data-original="#cf2d48" />
                        <path fill="#eb4132" d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z" data-original="#eb4132" />
                    </svg>
                    </button> 
                </div>
                </form>
            </div>
    </div>
  )
}

export default LoginPage
