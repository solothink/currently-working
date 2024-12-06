"use client";
import { motion } from "framer-motion";

import React from "react";

export default function VisionMission() {
  return (
    <section className="py-16 container bg-neutral-100 dark:bg-neutral-900">
      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-primary-50 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 p-8 rounded-2xl shadow-md relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold text-primary-800 dark:text-primary-100 mb-8 text-center relative"
            >
              Our Vision
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-neutral-700 dark:text-neutral-300 text-center relative"
            >
              MAKING TOURISM SECTOR AFFORDABLE AND ACCESSIBLE FOR MASSES
            </motion.p>
          </div>

          <div className="bg-gradient-to-br from-secondary-50 to-primary-100 dark:from-secondary-900/30 dark:to-primary-900/30 p-8 rounded-2xl shadow-md relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold text-primary-800 dark:text-primary-100 mb-8 text-center relative"
            >
              Our Mission
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4 relative"
            >
              <p className="text-lg text-neutral-700 dark:text-neutral-300">
                BUILD AFFORDABLE BRANDED HOTELS CHAIN & THAT ALLOW TO STAY
                ACCORDING TO USE, AND OFFER THE 24 HOURS CHECK-IN AND CHECK-OUT
                AGAINST THE STANDARD TIME OF THE CHECK-IN
              </p>
              {/* <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-2">
              <li>Provide flexible, hourly room bookings</li>
              <li>Ensure cost-effective stays without compromising quality</li>
            </ul> */}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
