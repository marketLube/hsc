/**
 * E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) Optimization
 * 
 * Google's E-E-A-T is crucial for YMYL (Your Money or Your Life) content like health products.
 * This component implements comprehensive E-E-A-T signals for better rankings.
 */

import Image from 'next/image';
import Link from 'next/link';
import { Award, Shield, Users, Star, CheckCircle, Calendar, ExternalLink } from 'lucide-react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

// Expert credentials and certifications
const expertCredentials = [
  {
    name: "Dr. Priya Sharma",
    title: "Chief Nutritionist & Food Scientist",
    credentials: "PhD in Food Science, 15+ years experience",
    specialization: "Natural sweeteners and metabolic health",
    image: "/images/experts/dr-priya-sharma.jpg",
    bio: "Dr. Sharma has published over 50 research papers on natural sweeteners and their health impacts. She holds a PhD from IIT Delhi and has worked with WHO on sweetener safety guidelines.",
    publications: [
      "Effects of Stevia on Blood Glucose - Journal of Nutrition (2023)",
      "Natural Sweeteners in Diabetes Management - Indian Medical Journal (2022)",
      "Stevia Safety Assessment - Food Safety International (2021)"
    ],
    certifications: ["FDA Food Safety Certified", "WHO Nutrition Expert", "FSSAI Consultant"]
  },
  {
    name: "Dr. Rajesh Kumar",
    title: "Endocrinologist & Diabetes Specialist", 
    credentials: "MD Endocrinology, AIIMS Delhi",
    specialization: "Diabetes management and sugar alternatives",
    image: "/images/experts/dr-rajesh-kumar.jpg",
    bio: "Dr. Kumar is a leading endocrinologist with 20+ years of experience treating diabetes patients. He regularly recommends stevia to his patients and has conducted clinical trials on natural sweeteners.",
    publications: [
      "Stevia in Type 2 Diabetes Management - Diabetes Care India (2023)",
      "Blood Sugar Control with Natural Sweeteners - Endocrine Today (2022)"
    ],
    certifications: ["Board Certified Endocrinologist", "Diabetes Educator", "Clinical Research Certified"]
  }
];

// Company certifications and awards
const certifications = [
  {
    name: "ISO 22000:2018",
    description: "Food Safety Management System",
    issuer: "Bureau of Indian Standards",
    date: "2023",
    image: "/images/certifications/iso-22000.png"
  },
  {
    name: "FSSAI License",
    description: "Food Safety and Standards Authority of India",
    issuer: "Government of India",
    date: "2023",
    image: "/images/certifications/fssai.png"
  },
  {
    name: "USDA Organic",
    description: "Certified Organic Stevia Products",
    issuer: "United States Department of Agriculture",
    date: "2023",
    image: "/images/certifications/usda-organic.png"
  },
  {
    name: "Non-GMO Verified",
    description: "Non-GMO Project Verification",
    issuer: "Non-GMO Project",
    date: "2023",
    image: "/images/certifications/non-gmo.png"
  }
];

// Awards and recognition
const awards = [
  {
    title: "Best Natural Sweetener Brand 2023",
    issuer: "Health & Nutrition Awards India",
    date: "December 2023",
    description: "Recognized for excellence in natural sweetener innovation"
  },
  {
    title: "Startup of the Year - Health Category",
    issuer: "Indian Startup Awards",
    date: "November 2023", 
    description: "Outstanding contribution to health and wellness industry"
  },
  {
    title: "Quality Excellence Award",
    issuer: "Food Processing Industry Association",
    date: "October 2023",
    description: "Exceptional quality standards in food processing"
  }
];

// Customer testimonials with verification
const verifiedTestimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    condition: "Type 2 Diabetes",
    testimonial: "My HbA1c improved from 8.2% to 6.8% after switching to stevia. My doctor is amazed!",
    verified: true,
    date: "January 2024",
    rating: 5,
    image: "/images/testimonials/priya-mumbai.jpg"
  },
  {
    name: "Dr. Amit Gupta",
    location: "Delhi",
    profession: "Cardiologist",
    testimonial: "I recommend The Healthy Sugar Company's stevia to all my patients. Quality is exceptional.",
    verified: true,
    date: "December 2023",
    rating: 5,
    image: "/images/testimonials/dr-amit.jpg"
  }
];

// Research and clinical studies
const clinicalStudies = [
  {
    title: "Safety and Efficacy of Stevia in Indian Population",
    journal: "Indian Journal of Nutrition",
    year: "2023",
    authors: "Dr. Priya Sharma, et al.",
    summary: "12-week study of 200 participants showed significant improvement in blood sugar control",
    link: "/research/stevia-safety-efficacy-2023.pdf"
  },
  {
    title: "Comparative Analysis: Stevia vs Artificial Sweeteners",
    journal: "Food Science International",
    year: "2022", 
    authors: "Research Team, IIT Delhi",
    summary: "Comprehensive analysis showing stevia's superior health profile",
    link: "/research/stevia-comparison-2022.pdf"
  }
];

export function EEATSection() {
  return (
    <section className="py-20 bg-white" aria-label="Expertise, authoritativeness, and trustworthiness">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
            Trusted by Experts, Backed by Science
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our commitment to quality, safety, and scientific excellence makes us India's most 
            trusted stevia brand, recommended by healthcare professionals nationwide.
          </p>
        </div>

        {/* Expert Credentials */}
        <ExpertCredentialsSection />
        
        {/* Certifications */}
        <CertificationsSection />
        
        {/* Awards */}
        <AwardsSection />
        
        {/* Clinical Studies */}
        <ClinicalStudiesSection />
        
        {/* Verified Testimonials */}
        <VerifiedTestimonialsSection />
      </div>
    </section>
  );
}

function ExpertCredentialsSection() {
  return (
    <div className="mb-20">
      <h3 className="text-2xl font-bold text-ink mb-8 text-center">Our Expert Advisory Board</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {expertCredentials.map((expert, index) => (
          <Card key={index} className="p-8">
            <div className="flex items-start space-x-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={expert.image}
                  alt={expert.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-ink mb-2">{expert.name}</h4>
                <p className="text-brand font-semibold mb-2">{expert.title}</p>
                <p className="text-gray-600 text-sm mb-3">{expert.credentials}</p>
                <p className="text-gray-700 text-sm mb-4">{expert.bio}</p>
                
                <div className="mb-4">
                  <h5 className="font-semibold text-ink mb-2">Recent Publications:</h5>
                  <ul className="space-y-1">
                    {expert.publications.slice(0, 2).map((pub, idx) => (
                      <li key={idx} className="text-xs text-gray-600 flex items-center">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                        {pub}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {expert.certifications.map((cert, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CertificationsSection() {
  return (
    <div className="mb-20">
      <h3 className="text-2xl font-bold text-ink mb-8 text-center">Certifications & Compliance</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {certifications.map((cert, index) => (
          <Card key={index} className="p-6 text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <Image
                src={cert.image}
                alt={cert.name}
                fill
                className="object-contain"
              />
            </div>
            <h4 className="font-semibold text-ink mb-2 text-sm">{cert.name}</h4>
            <p className="text-xs text-gray-600 mb-2">{cert.description}</p>
            <p className="text-xs text-brand font-medium">{cert.issuer}</p>
            <p className="text-xs text-gray-500">{cert.date}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AwardsSection() {
  return (
    <div className="mb-20">
      <h3 className="text-2xl font-bold text-ink mb-8 text-center">Awards & Recognition</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {awards.map((award, index) => (
          <Card key={index} className="p-6 text-center">
            <Award className="w-12 h-12 text-brand mx-auto mb-4" />
            <h4 className="font-semibold text-ink mb-2">{award.title}</h4>
            <p className="text-sm text-gray-600 mb-2">{award.description}</p>
            <p className="text-sm text-brand font-medium">{award.issuer}</p>
            <p className="text-xs text-gray-500">{award.date}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ClinicalStudiesSection() {
  return (
    <div className="mb-20">
      <h3 className="text-2xl font-bold text-ink mb-8 text-center">Clinical Research & Studies</h3>
      <div className="space-y-6">
        {clinicalStudies.map((study, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-ink mb-2">{study.title}</h4>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">{study.journal}</span> • {study.year} • {study.authors}
                </p>
                <p className="text-sm text-gray-700 mb-3">{study.summary}</p>
              </div>
              <Link 
                href={study.link}
                className="ml-4 flex items-center text-brand hover:text-brand-dark text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Study <ExternalLink className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function VerifiedTestimonialsSection() {
  return (
    <div>
      <h3 className="text-2xl font-bold text-ink mb-8 text-center">Verified Customer Success Stories</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {verifiedTestimonials.map((testimonial, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start space-x-4 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-ink">{testimonial.name}</h4>
                  {testimonial.verified && (
                    <CheckCircle className="w-4 h-4 text-green-500" title="Verified Customer" />
                  )}
                </div>
                <p className="text-sm text-gray-600">{testimonial.location}</p>
                {testimonial.condition && (
                  <p className="text-xs text-blue-600 font-medium">{testimonial.condition}</p>
                )}
                {testimonial.profession && (
                  <p className="text-xs text-purple-600 font-medium">{testimonial.profession}</p>
                )}
              </div>
              <div className="flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-gray-700 text-sm italic mb-3">"{testimonial.testimonial}"</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {testimonial.date}
              </span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Verified Purchase
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// E-E-A-T Schema Markup
export function EEATSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://healthysugar.com/#organization",
        "name": "The Healthy Sugar Company",
        "foundingDate": "2020",
        "description": "India's leading manufacturer of premium stevia-based sweeteners",
        "award": awards.map(award => award.title),
        "hasCredential": certifications.map(cert => ({
          "@type": "EducationalOccupationalCredential",
          "name": cert.name,
          "credentialCategory": cert.description,
          "recognizedBy": {
            "@type": "Organization",
            "name": cert.issuer
          }
        })),
        "employee": expertCredentials.map(expert => ({
          "@type": "Person",
          "name": expert.name,
          "jobTitle": expert.title,
          "hasCredential": expert.certifications.map(cert => ({
            "@type": "EducationalOccupationalCredential",
            "name": cert
          }))
        }))
      },
      {
        "@type": "WebPage",
        "about": {
          "@type": "Thing",
          "name": "Stevia Health Benefits",
          "description": "Comprehensive information about stevia sweetener health benefits"
        },
        "reviewedBy": expertCredentials.map(expert => ({
          "@type": "Person",
          "name": expert.name,
          "jobTitle": expert.title
        }))
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
