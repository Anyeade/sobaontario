"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="border-t border-stroke bg-white dark:border-strokedark dark:bg-blacksection">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          {/* <!-- Footer Top --> */}
          <div className="py-20 lg:py-25">
            <div className="flex flex-wrap gap-8 lg:justify-between lg:gap-0">
              <motion.div
                variants={{
                  hidden: {
                    opacity: 0,
                    y: -20,
                  },

                  visible: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="animate_top w-1/2 lg:w-1/4"
              >
                <Link href="/" className="relative">
                  <Image
                    width={150}
                    height={60}
                    src="/images/logo/logo.png"
                    alt="SOBA Ontario Logo"
                    className="w-auto h-12"
                  />
                </Link>

                <p className="mb-10 mt-5">
                  Connecting Sasse Old Boys Association across Ontario, Canada. Building community, 
                  supporting education, and making a positive impact together.
                </p>

                <p className="mb-1.5 text-sectiontitle uppercase tracking-[5px]">
                  contact
                </p>
                <a
                  href="mailto:info@sobaontario.org"
                  className="mb-3 block text-itemtitle font-medium text-black dark:text-white hover:text-primary"
                >
                  info@sobaontario.org
                </a>
                
                <div className="mb-3">
                  <p className="text-itemtitle font-medium text-black dark:text-white">
                    46 Olde Town Road<br />
                    Brampton, ON, L6X 4T8<br />
                    Canada
                  </p>
                </div>
                
                <a
                  href="tel:226-606-0197"
                  className="text-itemtitle font-medium text-black dark:text-white hover:text-primary"
                >
                  226-606-0197
                </a>
              </motion.div>

              <div className="flex w-full flex-col gap-8 md:flex-row md:justify-between md:gap-12 lg:w-2/3 lg:gap-16 xl:w-7/12 xl:gap-20">
                <motion.div
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: -20,
                    },

                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="animate_top"
                >
                  <h4 className="mb-9 text-itemtitle2 font-medium text-black dark:text-white">
                    Quick Links
                  </h4>

                  <ul>
                    <li>
                      <Link
                        href="/"
                        className="mb-3 inline-block hover:text-primary"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/#about"
                        className="mb-3 inline-block hover:text-primary"
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/membership"
                        className="mb-3 inline-block hover:text-primary"
                      >
                        Membership
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/events"
                        className="mb-3 inline-block hover:text-primary"
                      >
                        Events
                      </Link>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: -20,
                    },

                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="animate_top"
                >
                  <h4 className="mb-9 text-itemtitle2 font-medium text-black dark:text-white">
                    Get Involved
                  </h4>

                  <ul>
                    <li>
                      <Link
                        href="/outreach"
                        className="mb-3 inline-block hover:text-primary"
                      >
                        Community Outreach
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/donations"
                        className="mb-3 inline-block hover:text-primary"
                      >
                        Make a Donation
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/gallery"
                        className="mb-3 inline-block hover:text-primary"
                      >
                        Photo Gallery
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="mb-3 inline-block hover:text-primary"
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: -20,
                    },

                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="animate_top"
                >
                  <h4 className="mb-9 text-itemtitle2 font-medium text-black dark:text-white">
                    Stay Connected
                  </h4>
                  <p className="mb-4 w-[90%]">
                    Join our community and stay updated with SOBA Ontario news, events, and initiatives.
                  </p>

                  <div className="mb-6">
                    <a
                      href="https://tawk.to/chat/6724fb522480f5b4f5977e86/1ibk7bf9c"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-primary/90"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.39L2 22l5.61-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10zm0 18c-1.4 0-2.76-.35-3.95-1.01L7 19.5l.51-1.05C6.85 17.26 6.5 15.9 6.5 14.5c0-3.04 2.46-5.5 5.5-5.5s5.5 2.46 5.5 5.5S15.04 20 12 20z"/>
                      </svg>
                      Live Chat Support
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
          {/* <!-- Footer Top --> */}

          {/* <!-- Footer Bottom --> */}
          <div className="flex flex-col flex-wrap items-center justify-center gap-5 border-t border-stroke py-7 dark:border-strokedark lg:flex-row lg:justify-between lg:gap-0">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top"
            >
              <ul className="flex items-center gap-8">
                <li>
                  <Link href="/news" className="hover:text-primary">
                    News
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary">
                    Support
                  </Link>
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top"
            >
              <div className="text-center">
                <p className="mb-1">
                  &copy; {new Date().getFullYear()} SOBA Ontario. All rights reserved
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Made with <span className="text-red-500">❤️</span> by Hans Ade
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top"
            >
              <ul className="flex items-center gap-5">
                <li>
                  <a 
                    href="https://www.facebook.com/profile.php?id=100077660994849"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook" 
                    className="group"
                  >
                    <svg
                      className="fill-[#D1D8E0] transition-all duration-300 group-hover:fill-primary"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://twitter.com/SobaOntario"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter" 
                    className="group"
                  >
                    <svg
                      className="fill-[#D1D8E0] transition-all duration-300 group-hover:fill-primary"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
          {/* <!-- Footer Bottom --> */}
        </div>
      </footer>
    </>
  );
};

export default Footer;
