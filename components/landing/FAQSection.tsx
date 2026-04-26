'use client';

import { useState, ReactNode } from 'react';
import { Card } from '@/components/Card';

interface FAQ {
  question: string;
  answer: string | ReactNode;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

function FAQItem({ question, answer, defaultOpen = false }: FAQ & { defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left"
      >
        <span className="font-semibold text-[#1F2937] pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-[#6B7280] flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-5' : 'max-h-0'
        }`}
      >
        {typeof answer === 'string' ? (
          <p className="text-[#6B7280] leading-relaxed">{answer}</p>
        ) : (
          <div className="text-[#6B7280] leading-relaxed">{answer}</div>
        )}
      </div>
    </div>
  );
}

export function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <section className="section">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-3">Pertanyaan Umum</h2>
          <p className="text-[#6B7280] text-lg">
            Temukan jawaban untuk pertanyaan yang sering ditanyakan
          </p>
        </div>

        <Card className="p-0 divide-y divide-gray-100">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} defaultOpen={index === 0} />
          ))}
        </Card>
      </div>
    </section>
  );
}
