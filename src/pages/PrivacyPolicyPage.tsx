import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ChevronLeft, FileText, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicyPage() {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.scrollTo(0, 0);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white pt-16 pb-24">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-blue-50 to-transparent opacity-70"></div>
      <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-blue-100 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-indigo-100 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-30"></div>
      
      <div className="container max-w-4xl mx-auto px-4 relative">
        {/* Back button */}
        <div className="mb-8">
          <Link 
            to="/pledge" 
            className="inline-flex items-center text-blue-700 hover:text-blue-800 transition-colors"
          >
            <ChevronLeft size={16} className="mr-1" />
            <span>Back to Our Privacy Pledge</span>
          </Link>
        </div>

        {/* Document header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Shield className="w-10 h-10 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-center text-gray-900">Privacy Policy</h1>
          <p className="text-center text-gray-700 max-w-xl mx-auto mb-2">MyEmpath Application</p>
          <p className="text-center text-gray-500 mb-4">Last updated: January 10, 2024 (v1.0)</p>
          <div className="flex justify-center items-center space-x-4">
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Official Document</span>
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full flex items-center">
              <FileText size={12} className="mr-1" />
              PDF Available
            </span>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sticky Table of Contents on larger screens */}
          <motion.aside 
            className="md:w-64 md:sticky md:top-24 md:self-start mb-8 md:mb-0 bg-white rounded-xl shadow-md overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-700">
              <h2 className="text-lg font-semibold text-white">Table of Contents</h2>
            </div>
            <nav className="p-4">
              <ul className="space-y-2 text-sm">
                <li><a href="#interpretation" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">1. Interpretation and Definitions</a></li>
                <li><a href="#collecting" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">2. Collecting and Using Your Data</a></li>
                <li><a href="#retention" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">3. Retention of Your Data</a></li>
                <li><a href="#transfer" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">4. Transfer of Your Data</a></li>
                <li><a href="#delete" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">5. Delete Your Data</a></li>
                <li><a href="#disclosure" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">6. Disclosure of Your Data</a></li>
                <li><a href="#security" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">7. Security of Your Data</a></li>
                <li><a href="#processing" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">8. Processing Details</a></li>
                <li><a href="#ccpa" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">9. CCPA/CPRA Notice</a></li>
                <li><a href="#children" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">10. Children's Privacy</a></li>
                <li><a href="#links" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">11. Links to Other Websites</a></li>
                <li><a href="#changes" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">12. Changes to this Policy</a></li>
                <li><a href="#contact" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">13. Contact Us</a></li>
              </ul>
            </nav>
            
            {/* Print button */}
            <div className="p-4 pt-0">
              <button 
                onClick={() => window.print()} 
                className="w-full flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-800 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              >
                <FileText size={14} />
                Print Document
              </button>
            </div>
          </motion.aside>

          {/* Main content */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="prose prose-lg max-w-none bg-white rounded-xl shadow-md p-6 md:p-8 print:shadow-none">
              <div className="bg-blue-50 p-4 rounded-lg mb-8 print:bg-white">
                <p className="text-blue-700 font-medium mb-0">This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
              </div>
              
              <p>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.</p>

              <div className="my-8 border-t border-gray-200"></div>

              <h2 id="interpretation" className="flex items-center text-blue-700 scroll-mt-24">
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 flex-shrink-0">1</span>
                Interpretation and Definitions
              </h2>
              <h3 className="text-blue-700">Interpretation</h3>
              <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
              
              <h3 className="text-blue-700">Definitions</h3>
              <p>For the purposes of this Privacy Policy:</p>
              <div className="bg-blue-50 rounded-lg p-5 my-4 print:bg-white print:border print:border-gray-200">
                <ul className="space-y-3 list-none pl-0">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                    <span><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                    <span><strong>Company</strong> refers to Reality Articulated Inc., 701 W Rio Salado Pkwy, Tempe AZ 85281.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                    <span><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                    <span><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                    <span><strong>Service</strong> refers to the Application.</span>
                  </li>
                </ul>
              </div>

              <div className="my-8 border-t border-gray-100"></div>

              <h2 id="collecting" className="flex items-center text-blue-700 scroll-mt-24">
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 flex-shrink-0">2</span>
                Collecting and Using Your Personal Data
              </h2>
              
              <h3 className="text-blue-700">Types of Data Collected</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <h4 className="text-blue-700 mb-2 font-semibold">Personal Data</h4>
                  <p className="mb-2">While using Our Service, We may ask You to provide Us with:</p>
                  <ul className="space-y-1 pl-5 list-disc">
                    <li>Email address</li>
                    <li>First name and last name</li>
                    <li>Usage Data</li>
                  </ul>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <h4 className="text-blue-700 mb-2 font-semibold">Usage Data</h4>
                  <p>Usage Data is collected automatically when using the Service, including your Device's Internet Protocol address, browser type, pages visited, and other diagnostic data.</p>
                </div>
              </div>
              
              <h3 className="text-blue-700">Information Collected while Using the Application</h3>
              <div className="p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded-md my-4">
                <p className="mb-0">While using Our Application, with Your prior permission, we may collect pictures and other information from your Device's camera and photo library.</p>
              </div>
              
              <h3 className="text-blue-700">Use of Your Personal Data</h3>
              <p>The Company may use Personal Data for the following purposes:</p>
              <ul className="space-y-2 mt-2">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1">•</span>
                  <span>To provide and maintain our Service, including to monitor the usage of our Service.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1">•</span>
                  <span>To manage Your Account and registration as a user of the Service.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1">•</span>
                  <span>To contact You regarding updates or informative communications related to the Service.</span>
                </li>
              </ul>

              <div className="my-8 border-t border-gray-100"></div>

              <h2 id="retention" className="flex items-center text-blue-700 scroll-mt-24">
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 flex-shrink-0">3</span>
                Retention of Your Personal Data
              </h2>
              <p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies.</p>
              
              <div className="bg-blue-50 rounded-lg p-5 my-4 print:bg-white print:border print:border-gray-200">
                <h4 className="text-blue-700 font-semibold mb-3">Data Retention Summary</h4>
                <ul className="space-y-2 list-none pl-0">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                    <span><strong>Active accounts:</strong> Journal entries are retained while your account is active.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                    <span><strong>Account deletion:</strong> Data is removed within 30 days of your deletion request.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                    <span><strong>Backup purge:</strong> Backup copies are completely purged within 90 days.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                    <span><strong>Storage location:</strong> All data is stored on encrypted AWS cloud infrastructure.</span>
                  </li>
                </ul>
              </div>

              <div className="my-8 border-t border-gray-100"></div>

              <h2 id="transfer" className="flex items-center text-blue-700 scroll-mt-24">
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 flex-shrink-0">4</span>
                Transfer of Your Personal Data
              </h2>
              <p>Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.</p>

              <div className="my-8 border-t border-gray-100"></div>

              <h2 id="delete" className="flex items-center text-blue-700 scroll-mt-24">
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 flex-shrink-0">5</span>
                Delete Your Personal Data
              </h2>
              <p>You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You. Our Service may give You the ability to delete certain information about You from within the Service.</p>
              
              <div className="bg-blue-50 rounded-lg p-5 my-4 print:bg-white print:border print:border-gray-200">
                <h4 className="text-blue-700 font-semibold mb-3">Your Deletion Rights</h4>
                <ul className="space-y-2 list-none pl-0">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                    <span><strong>Individual journal entries</strong> can be deleted at any time within the app.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                    <span><strong>Full account deletion</strong> is available upon request by contacting karan@myempath.co.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                    <span><strong>Data removal timeline:</strong> Your data is removed within 30 days of deletion request; backup copies are purged within 90 days.</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-blue-700">Journal Sharing Controls</h3>
              <p>You are always in control of which journal entries are shared with your therapist:</p>
              <ul className="space-y-2 mt-2">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-green-100 rounded-full w-5 h-5 mr-2 text-green-700 text-xs mt-1">✓</span>
                  <span>You decide which entries to share—sharing is never automatic.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-green-100 rounded-full w-5 h-5 mr-2 text-green-700 text-xs mt-1">✓</span>
                  <span>You can unshare any entry at any time—your therapist will immediately lose access.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-green-100 rounded-full w-5 h-5 mr-2 text-green-700 text-xs mt-1">✓</span>
                  <span>Deleting an entry removes it from both your account and your therapist's view.</span>
                </li>
              </ul>

              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-md my-4">
                <p className="mb-0"><strong>Important:</strong> Your therapist may have saved or noted information from previously shared entries as part of their own clinical records. Deleting or unsharing from Empath removes their access within our platform, but we cannot delete records your therapist may have kept separately.</p>
              </div>

              <div className="my-8 border-t border-gray-100"></div>

              <h2 id="disclosure" className="flex items-center text-blue-700 scroll-mt-24">
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 flex-shrink-0">6</span>
                Disclosure of Your Personal Data
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <h4 className="text-blue-700 mb-2 font-semibold">Business Transactions</h4>
                  <p className="mb-0">If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred.</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <h4 className="text-blue-700 mb-2 font-semibold">Law Enforcement</h4>
                  <p className="mb-0">Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities.</p>
                </div>
              </div>

              <div className="my-8 border-t border-gray-100"></div>

              <h2 id="security" className="flex items-center text-blue-700 scroll-mt-24">
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 flex-shrink-0">7</span>
                Security of Your Personal Data
              </h2>
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-md my-4">
                <p className="mb-0">The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
              </div>

              <div className="my-8 border-t border-gray-100"></div>

              <h2 id="processing" className="flex items-center text-blue-700 scroll-mt-24">
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 flex-shrink-0">8</span>
                Detailed Information on the Processing of Your Personal Data
              </h2>
              <p>We engage third-party vendors under Business Associate Agreements (BAAs) to ensure the protection of your Personal Data. These agreements obligate our vendors to adhere to strict data protection standards, ensuring that your data is encrypted and inaccessible to unauthorized parties. Even our third-party vendors are prohibited from using your data for any purpose other than providing services to us.</p>

              <div className="my-8 border-t border-gray-100"></div>

              <h2 id="ccpa" className="flex items-center text-blue-700 scroll-mt-24">
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 flex-shrink-0">9</span>
                CCPA/CPRA Privacy Notice (California Privacy Rights)
              </h2>
              <p>This privacy notice section for California residents supplements the information contained in Our Privacy Policy and it applies solely to all visitors, users, and others who reside in the State of California.</p>
              
              <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-md my-4">
                <h4 className="text-amber-800 font-semibold mb-2">California Residents: Your Right to Delete</h4>
                <p className="mb-2">Under the California Consumer Privacy Act (CCPA), you have the right to request deletion of all your personal data at any time. Upon receiving a verified request, we will:</p>
                <ul className="space-y-1 pl-5 list-disc text-amber-900">
                  <li>Delete your personal data from our records within <strong>45 days</strong></li>
                  <li>Direct any service providers to delete your data from their records</li>
                  <li>Provide written confirmation of deletion upon request</li>
                </ul>
              </div>
              
              <div className="mt-4 space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-blue-700">Your Rights under the CCPA/CPRA</h3>
                  <p>The CCPA/CPRA provides California residents with specific rights regarding their personal information. These include:</p>
                  <ul className="space-y-1 pl-5 list-disc">
                    <li>The right to notice</li>
                    <li>The right to know/access</li>
                    <li>The right to opt-out of sale or sharing</li>
                    <li>The right to correct Personal Data</li>
                    <li>The right to limit use of sensitive Personal Data</li>
                    <li><strong>The right to delete Personal Data</strong> — we will comply within 45 days</li>
                    <li>The right not to be discriminated against</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-green-700">We Do Not Sell Your Data</h3>
                  <p>Empath does not sell, rent, or trade your personal information to third parties. Your journal entries and personal data are never used for advertising, marketing, or sold to data brokers.</p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-blue-700">Exercising Your CCPA/CPRA Data Protection Rights</h3>
                  <p>To exercise any of Your rights under the CCPA/CPRA as a California resident, You can contact Us:</p>
                  <ul className="space-y-1 pl-5 list-disc">
                    <li>By email: <a href="mailto:karan@myempath.co" className="text-blue-600">karan@myempath.co</a></li>
                    <li>By phone: 480.295.9462</li>
                  </ul>
                  <p className="mt-2 text-sm text-gray-600">We will respond to verified requests within 45 days as required by California law.</p>
                </div>
              </div>

              <div className="my-8 border-t border-gray-100"></div>

              <h2 id="children" className="flex items-center text-blue-700 scroll-mt-24">
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 flex-shrink-0">10</span>
                Children's Privacy
              </h2>
              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-md my-4">
                <p className="mb-0">Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us.</p>
              </div>

              <div className="my-8 border-t border-gray-100"></div>

              <h2 id="links" className="flex items-center text-blue-700 scroll-mt-24">
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 flex-shrink-0">11</span>
                Links to Other Websites
              </h2>
              <p>Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.</p>

              <div className="my-8 border-t border-gray-100"></div>

              <h2 id="changes" className="flex items-center text-blue-700 scroll-mt-24">
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 flex-shrink-0">12</span>
                Changes to this Privacy Policy
              </h2>
              <p>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top.</p>

              <div className="my-8 border-t border-gray-100"></div>

              <h2 id="contact" className="flex items-center text-blue-700 scroll-mt-24">
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 flex-shrink-0">13</span>
                Contact Us
              </h2>
              <p>If you have any questions about this Privacy Policy, You can contact us:</p>
              <div className="p-4 bg-blue-50 rounded-lg mt-2">
                <p className="flex items-center mb-2">
                  <span className="text-blue-700 mr-2">📧</span>
                  <a href="mailto:karan@myempath.co" className="text-blue-600 hover:text-blue-800 transition-colors">karan@myempath.co</a>
                </p>
                <p className="flex items-center">
                  <span className="text-blue-700 mr-2">📞</span>
                  <span>480.295.9462</span>
                </p>
              </div>
            </div>
            
            {/* Document acknowledgment */}
            <div className="mt-10 bg-white rounded-xl shadow-md p-6 print:hidden">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Acknowledgment</h2>
              <p className="text-gray-700 mb-6">
                By using the MyEmpath application, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/pledge"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  Return to Our Privacy Pledge
                </Link>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <FileText size={16} />
                  Print This Document
                </button>
              </div>
            </div>
            
            {/* Version history */}
            <div className="mt-6 text-xs text-gray-500 print:hidden">
              <p>Document Version: 1.0</p>
              <p>Previous Versions: None</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-colors z-50 print:hidden"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </div>
  );
} 