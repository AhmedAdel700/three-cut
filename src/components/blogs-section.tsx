"use client";
import React from "react";
import { ScrollReveal } from "./scroll-reveal";
import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import img1 from "@/app/assets/img1.png"; // sample image

const dummyBlogs = [
  {
    id: 1,
    title: "Understanding CNC Cutting: A Beginner's Guide",
    excerpt:
      "Learn the fundamentals of CNC cutting, its applications, and why modern industries rely on it for precision manufacturing.",
    image: img1,
    slug: "cnc-cutting-guide",
  },
  {
    id: 2,
    title: "Top 5 Laser Cutting Techniques for 2025",
    excerpt:
      "Explore the latest advancements in laser cutting and how they are reshaping engineering and fabrication processes.",
    image: img1,
    slug: "laser-cutting-techniques",
  },
  {
    id: 3,
    title: "How Automated Machines Improve Productivity",
    excerpt:
      "Automation is transforming industries. Here's how automated cutting systems boost efficiency and reduce costs.",
    image: img1,
    slug: "automated-machines-productivity",
  },
];

export default function BlogSection() {
  return (
    <section className="px-4 py-16 lg:py-24 relative overflow-hidden border-t dark-section-bg">
      <div className="container mx-auto grid gap-16 lg:gap-8">
        {/* Header */}
        <ScrollReveal>
          <div className="grid place-items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4"
            >
              <Sparkles className="h-7 w-7 text-brand-accent-red" />
              <span className="text-white uppercase tracking-wider text-base font-semibold">
                Our Blogs
              </span>
              <Sparkles className="h-7 w-7 text-brand-accent-red" />
            </motion.div>

            {/* Title */}
            <h2 className="text-3xl lg:text-5xl font-bold font-display bg-gradient-to-b from-brand-accent-light to-brand-quaternary bg-clip-text text-transparent !leading-[1.25] text-center">
              Explore the Latest Insights
            </h2>

            {/* Description */}
            <div className="grid place-items-center">
              <p className="text-lg text-muted-foreground max-w-3xl text-center leading-relaxed">
                Stay updated with industry trends, development tips, and
                deep-dive articles crafted to help you grow and stay ahead.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Products Display (Now contains 3 blog cards) */}
        <div className="flex justify-center w-full">
          <div className="w-full max-w-7xl">
            <AnimatePresence mode="wait">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {dummyBlogs.map((blog, index) => (
                  <ScrollReveal key={blog.id} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300 border h-full flex flex-col p-0">
                        {/* Image */}
                        <div className="relative h-48 w-full overflow-hidden bg-muted">
                          <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Content */}
                        <CardContent className="px-5 pb-5 flex flex-col flex-grow">
                          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                            {blog.title}
                          </h3>

                          <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
                            {blog.excerpt}
                          </p>

                          <Link
                            href={`/blogs/${blog.slug}`}
                            className="text-brand-accent-light"
                          >
                            Read More
                          </Link>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
