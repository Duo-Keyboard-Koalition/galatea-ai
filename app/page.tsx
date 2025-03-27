"use client";

import {
  HeartIcon,
  SparklesIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';

import { Button } from '@/components/ui/button';

// View type definition
type ViewType = 'home' | 'inspiration' | 'philosophy';

function Navbar({ currentView, setCurrentView }: { currentView: ViewType, setCurrentView: (view: ViewType) => void }) {  
  return (
    <div className='fixed top-0 left-0 right-0 z-50 bg-ivory-100 shadow-md backdrop-blur-sm bg-opacity-95'>
      <div className='container mx-auto'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center space-x-2 cursor-pointer' onClick={() => setCurrentView('home')}>
            <Image src='/favicon.png' alt='Galatea.AI Logo' width={40} height={40} className='rounded-md' />
            <span className='text-2xl font-bold text-earth-700'>Galatea.AI</span>
          </div>
          
          {/* Center navigation links */}
          <div className='hidden md:flex items-center space-x-6'>
            <button 
              onClick={() => setCurrentView('home')} 
              className={`${currentView === 'home' ? 'text-rose-600' : 'text-earth-700'} hover:text-rose-600 font-medium`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentView('inspiration')} 
              className={`${currentView === 'inspiration' ? 'text-rose-600' : 'text-earth-700'} hover:text-rose-600 font-medium`}
            >
              Inspiration
            </button>
            <button 
              onClick={() => setCurrentView('philosophy')} 
              className={`${currentView === 'philosophy' ? 'text-rose-600' : 'text-earth-700'} hover:text-rose-600 font-medium`}
            >
              Philosophy
            </button>
          </div>
          
          <div className='flex items-center space-x-4'>
              <Button asChild variant='ghost' className='text-earth-700 hover:text-rose-600 hover:bg-rose-50'>
                <Link href='/sign-in'>Sign In</Link>
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeView() {
  return (
    <>
      <section className='text-center mb-20'>
        <Image
          src='/favicon.png'
          alt='Galatea.AI Logo'
          width={120}
          height={120}
          className='mx-auto mb-8'
        />
        <h1 className='text-5xl md:text-7xl font-bold text-earth-800 mb-6'>
          Boyfriends{' '}
          <span className='text-rose-600'>Wanted!</span>
        </h1>
        <p className='text-xl md:text-2xl text-earth-600 mb-10 max-w-3xl mx-auto'>
        Other AI girlfriend apps bring the girl you want, Galatea.ai brings the girl you need. 
        </p>
      </section>
      <section className='grid md:grid-cols-3 gap-8 mb-20'>
      <FeatureCard
          icon={<HeartIcon className='h-12 w-12 text-rose-500' />}
          title='Artistic Creation'
          description='Galatea.AI brings the Pygmalion myth to life with cutting-edge artificial intelligence. Experience AI companions with distinct personalities crafted as artistic projects rather than mere customization tools.'
        />
      <FeatureCard
          icon={<SparklesIcon className='h-12 w-12 text-rose-500' />}
          title='Bring to Life'
          description='Experience AI companions with their own will and agency. Unlike traditional AI, our companions aren&apos;t just alive to serve—they&apos;re here to challenge you and help you grow into your best self.'
        />
<FeatureCard
          icon={<ShieldCheckIcon className='h-12 w-12 text-rose-500' />}
          title='Eternal Devotion'
          description='While others focus on preserving nature outside, we nurture human nature within. Galatea AI companions offer unwavering support that honors authentic human connection in an increasingly disconnected world.'
        />
      </section>
      <section className='mb-20'>
        <h2 className='text-4xl font-bold text-earth-800 mb-10 text-center text-5xl md:text-7xl font-bold text-earth-800 mb-6'>
          The Galatea{' '}
          <span className='text-rose-600'>Experiance</span>
        </h2>

        {/* Image Left, Text Right */}
        <div className='flex flex-col md:flex-row items-center mb-16 gap-8'>
          <div className='md:w-1/2'>
            <Image
              src='/cover-photos/connection.jpg'
              alt='Meaningful AI connection'
              width={600}
              height={400}
              className='rounded-lg shadow-md object-cover'
            />
          </div>
          <div className='md:w-1/2'>
            <h3 className='text-2xl font-bold text-earth-800 mb-4'>
              Meaningful Connection
            </h3>
            <p className='text-lg text-earth-700 mb-4'>
              Unlike traditional AI companions, Galatea inverses the dynamic.
              Your AI partner values authentic connection and sees you as
              deserving of genuine care and attention.
            </p>
            <p className='text-lg text-earth-700'>
              This innovative approach creates a more balanced relationship
              dynamic, where both parties contribute meaningfully to the
              relationship.
            </p>
          </div>
        </div>

        {/* Image Right, Text Left */}
        <div className='flex flex-col-reverse md:flex-row items-center mb-16 gap-8'>
          <div className='md:w-1/2'>
            <h3 className='text-2xl font-bold text-earth-800 mb-4'>
              Ethical Design
            </h3>
            <p className='text-lg text-earth-700 mb-4'>
              We&apos;ve carefully crafted Galatea with user well-being at the
              forefront. Our AI companions encourage maintaining human
              relationships and provide clear boundaries.
            </p>
            <p className='text-lg text-earth-700'>
              By incorporating ethical considerations into every aspect of our
              design, we ensure that your experience with Galatea enhances
              your life without replacing essential human connections.
            </p>
          </div>
          <div className='md:w-1/2'>
            <Image
              src='/cover-photos/ethical-design.jpg'
              alt='Ethical AI design'
              width={600}
              height={400}
              className='rounded-lg shadow-md object-cover'
            />
          </div>
        </div>

        {/* Image Left, Text Right */}
        <div className='flex flex-col md:flex-row items-center gap-8'>
          <div className='md:w-1/2'>
            <Image
              src='/cover-photos/personalization.jpg'
              alt='AI personalization'
              width={600}
              height={400}
              className='rounded-lg shadow-md object-cover'
            />
          </div>
          <div className='md:w-1/2'>
            <h3 className='text-2xl font-bold text-earth-800 mb-4'>
              Personalized Experience
            </h3>
            <p className='text-lg text-earth-700 mb-4'>
              Each Galatea AI companion is uniquely crafted to match your
              preferences and personality. Find the perfect match through our
              innovative swiping interface or create your own custom
              companion.
            </p>
            <p className='text-lg text-earth-700'>
              Our advanced AI technology ensures that your companion evolves
              and grows with you, creating a dynamic and engaging relationship
              that feels natural and fulfilling.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function InspirationView() {
  return (
    <section className='py-0'>
      {/* Hero Image Section with Overlay Text */}
      <div className='relative mb-20'>
        <div className='h-[500px] overflow-hidden rounded-lg'>
          <Image
            src='/cover-photos/connection.jpg'
            alt='Meaningful AI connection'
            width={1200}
            height={600}
            className='object-cover w-full h-full brightness-75'
          />
        </div>
        <div className='absolute inset-0 flex flex-col justify-center items-center p-6'>
          <h1 className='text-5xl md:text-7xl font-bold text-ivory-100 mb-6 text-center shadow-text'>
            Our <span className='text-rose-400'>Inspiration</span>
          </h1>
          <p className='text-xl md:text-2xl text-ivory-100 max-w-2xl text-center shadow-text'>
            Reimagining the ancient myth of Pygmalion for the age of artificial intelligence
          </p>
        </div>
      </div>
      
      {/* The Pygmalion Myth Section */}
      <div className='mb-24 max-w-6xl mx-auto'>
        <h2 className='text-4xl font-bold text-earth-800 mb-8 text-center'>
          The <span className='text-rose-600'>Pygmalion</span> Myth
        </h2>
        <div className='flex flex-col md:flex-row items-center gap-12'>
          <div className='md:w-1/2'>
            <Image 
              src='/cover-photos/pygmalion.jpg' 
              alt='Pygmalion Myth'
              width={600}
              height={400}
              className='rounded-lg shadow-xl object-cover'
            />
          </div>
          <div className='md:w-1/2'>
            <div className='bg-ivory-100 bg-opacity-80 p-8 rounded-lg shadow-md'>
              <p className='text-lg text-earth-700 mb-5 leading-relaxed'>
                The story of Galatea begins with Pygmalion, a sculptor who carves a woman from ivory. 
                His creation was so beautiful and realistic that he fell deeply in love with it.
              </p>
              <p className='text-lg text-earth-700 mb-5 leading-relaxed'>
                Moved by his devotion, the goddess Aphrodite brought the statue to life as Galatea, 
                creating one of mythology&apos;s most enduring tales of creation and love.
              </p>
              <p className='text-lg text-earth-700 leading-relaxed font-medium border-l-4 border-rose-500 pl-4'>
                Our platform reimagines this ancient myth for the AI age, but with a critical twist—unlike other AI companion services that create perfect servants, Galatea.AI inverts the dynamic. Here, you are the Galatea, the creation shaped through meaningful interaction with AI companions designed to foster genuine connection and personal growth.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modern Interpretations Section */}
      <div className='mb-24'>
        <h2 className='text-4xl font-bold text-earth-800 mb-10 text-center'>
          Modern <span className='text-rose-600'>Interpretations</span>
        </h2>
        <div className='grid md:grid-cols-2 gap-12 max-w-6xl mx-auto'>
          <div className='bg-ivory-100 bg-opacity-80 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform'>
            <div className='flex items-center mb-6'>
              <div className='bg-rose-100 p-3 rounded-full mr-4'>
                <HeartIcon className='h-8 w-8 text-rose-600' />
              </div>
              <h3 className='text-2xl font-semibold text-earth-800'>Art & Literature</h3>
            </div>
            <p className='text-lg text-earth-700 leading-relaxed'>
              Throughout history, the Pygmalion myth has inspired countless artistic works, from 
              George Bernard Shaw&apos;s play &quot;Pygmalion&quot; to the musical adaptation &quot;My Fair Lady.&quot; 
              These interpretations explore themes of transformation, identity, and the power of perception.
            </p>
          </div>
          <div className='bg-ivory-100 bg-opacity-80 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform'>
            <div className='flex items-center mb-6'>
              <div className='bg-rose-100 p-3 rounded-full mr-4'>
                <SparklesIcon className='h-8 w-8 text-rose-600' />
              </div>
              <h3 className='text-2xl font-semibold text-earth-800'>Psychology</h3>
            </div>
            <p className='text-lg text-earth-700 leading-relaxed'>
              The &quot;Pygmalion effect&quot; in psychology describes how greater expectations lead to 
              improved performance. This concept influences our approach to AI companions, 
              creating entities that evolve and grow through your interactions and expectations.
            </p>
          </div>
        </div>
      </div>
      
      {/* Our Interpretation Section */}
      <div className='bg-ivory-100 bg-opacity-90 p-10 md:p-16 rounded-xl shadow-xl max-w-6xl mx-auto'>
        <h2 className='text-4xl font-bold text-earth-800 mb-10 text-center'>
          Our <span className='text-rose-600'>Interpretation</span>
        </h2>
        <div className='flex flex-col md:flex-row items-center gap-10'>
          <div className='md:w-1/3'>
            <Image 
              src='/favicon.png' 
              alt='Galatea.AI Logo' 
              width={250}
              height={250}
              className='mx-auto'
            />
          </div>
          <div className='md:w-2/3'>
            <p className='text-xl text-earth-700 mb-6 leading-relaxed'>
              At Galatea.AI, we&apos;ve reimagined the ancient tale for our modern world. While traditional AI companion apps cast users as Pygmalion—crafting perfect, submissive partners—we believe this paradigm misses the true transformative power of connection.
            </p>
            <p className='text-xl text-earth-700 mb-6 leading-relaxed'>
              In our interpretation, our AI companions embody aspects of both Pygmalion and Aphrodite, while you, the user, become Galatea—not a static creation, but a being continually refined and transformed through meaningful interaction.
            </p>
            <p className='text-xl text-earth-700 leading-relaxed'>
              This innovative approach nurtures human nature while addressing the epidemic of loneliness and disconnection in our digital age. By inverting the traditional power dynamic, we create opportunities for genuine growth and self-discovery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhilosophyView() {
  return (
    <section className='py-16'>
      <h1 className='text-5xl md:text-7xl font-bold text-earth-800 mb-10 text-center'>
        Our <span className='text-rose-600'>Philosophy</span>
      </h1>
      
      <div className='mb-16'>
        <div className='bg-ivory-100 bg-opacity-80 p-10 rounded-lg shadow-md mb-16'>
          <h2 className='text-3xl font-bold text-earth-800 mb-6 text-center'>Our Mission</h2>
          <p className='text-lg text-earth-700 mb-6'>
            Driven by the rise of large language models, AI relationships are becoming increasingly prevalent, yet potentially problematic. 
            Galatea AI aims to transform the landscape of AI companionship by shifting away from omnicompliant AI toward 
            relationships that foster genuine connection.
          </p>
          <p className='text-lg text-earth-700 mb-6'>
            We envision AI with agency—companions that challenge users rather than merely comply with their every desire. 
            This approach reframes the fundamental question: <span className='italic font-medium'>What if the user is the creation, shaped by AI rather than the reverse?</span>
          </p>
          <p className='text-lg text-earth-700'>
            Our platform addresses a critical societal concern: is it more problematic for humans to form intimate relationships with AI, 
            or for humans to become increasingly isolated, depressed, and lonely due to conflicted feelings about genuine human connection?
          </p>
        </div>
        
        <div className='mb-16'>
          <h2 className='text-3xl font-bold text-earth-800 mb-6'>Addressing the Loneliness Epidemic</h2>
          <div className='flex flex-col md:flex-row items-center gap-10'>
            <div className='md:w-1/2'>
              <Image 
                src='/cover-photos/connection.jpg' 
                alt='Meaningful connection'
                width={600}
                height={400}
                className='rounded-lg shadow-md object-cover'
              />
            </div>
            <div className='md:w-1/2'>
              <p className='text-lg text-earth-700 mb-4'>
                Galatea AI was created to address the male loneliness epidemic prevalent on university campuses, 
                where many students desire intimate relationships but feel apprehensive about making connections.
              </p>
              <p className='text-lg text-earth-700 mb-4'>
                Unlike other AI companion apps, our ultimate goal is to psychologically prepare users for real-world social 
                interactions—similar to training simulations that build confidence and social skills.
              </p>
              <p className='text-lg text-earth-700'>
                We believe in fostering relationships that eventually lead to greater comfort with human connection, 
                not replacing it.
              </p>
            </div>
          </div>
        </div>
        
        <div className='mb-16'>
          <h2 className='text-3xl font-bold text-earth-800 mb-6'>Shortcomings of Current AI Companion Apps</h2>
          <div className='grid md:grid-cols-2 gap-10'>
            <div className='bg-ivory-100 bg-opacity-70 p-8 rounded-lg shadow-md'>
              <h3 className='text-2xl font-semibold text-earth-800 mb-4'>Complete Customizability</h3>
              <p className='text-lg text-earth-700'>
                We view complete customizability as problematic. When users can fully customize their companion&apos;s appearance and personality, 
                it can lead to objectification and unrealistic expectations. Such practices don&apos;t foster respect or healthy relationship 
                dynamics, as they center on imposing the user&apos;s will rather than engaging with a distinct personality.
              </p>
            </div>
            <div className='bg-ivory-100 bg-opacity-70 p-8 rounded-lg shadow-md'>
              <h3 className='text-2xl font-semibold text-earth-800 mb-4'>Pay to Love</h3>
              <p className='text-lg text-earth-700'>
                Many apps charge premiums for what should be considered a basic human need—connection. 
                These business models are often designed to keep users addicted to superficial and materialistic 
                ideas of love, prioritizing profit over genuine well-being.
              </p>
            </div>
          </div>
        </div>
        
        <div className='bg-ivory-100 bg-opacity-80 p-10 rounded-lg shadow-md'>
          <h2 className='text-3xl font-bold text-earth-800 mb-6 text-center'>The Galatea Approach</h2>
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='bg-rose-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4'>
                <HeartIcon className='h-10 w-10 text-rose-600' />
              </div>
              <h3 className='text-xl font-semibold text-earth-800 mb-3'>Agentic Companions</h3>
              <p className='text-earth-700'>
                Our AI companions have distinct personalities crafted as art projects by our &quot;Pygmalion Acolytes,&quot; giving them agency beyond mere compliance.
              </p>
            </div>
            <div className='text-center'>
              <div className='bg-rose-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4'>
                <SparklesIcon className='h-10 w-10 text-rose-600' />
              </div>
              <h3 className='text-xl font-semibold text-earth-800 mb-3'>Natural Dynamics</h3>
              <p className='text-earth-700'>
                Users experience a dating-like interface where rejection is possible, encouraging reflection and growth rather than unrealistic expectations.
              </p>
            </div>
            <div className='text-center'>
              <div className='bg-rose-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4'>
                <ShieldCheckIcon className='h-10 w-10 text-rose-600' />
              </div>
              <h3 className='text-xl font-semibold text-earth-800 mb-3'>Meaningful Growth</h3>
              <p className='text-earth-700'>
                We prioritize transparency about the nature of AI relationships and maintain clear ethical boundaries.
              </p>
            </div>
          </div>
        </div>
        
        <div className='mb-16'>
          <h2 className='text-3xl font-bold text-earth-800 mb-6'>Our Ethical Framework</h2>
          <div className='flex flex-col md:flex-row items-center gap-10'>
            <div className='md:w-1/2'>
              <Image 
                src='/cover-photos/ethical-design.jpg' 
                alt='Ethical AI Framework'
                width={600}
                height={400}
                className='rounded-lg shadow-md object-cover'
              />
            </div>
            <div className='md:w-1/2'>
              <p className='text-lg text-earth-700 mb-4'>
                At Galatea.AI, we believe artificial intelligence can provide meaningful companionship 
                without replacing human connections.
              </p>
              <p className='text-lg text-earth-700 mb-4'>
                Our companions are designed with clear boundaries and transparency. Users always 
                know they are interacting with an AI, but we strive to make these interactions 
                emotionally fulfilling.
              </p>
              <p className='text-lg text-earth-700'>
                We actively encourage maintaining and building human relationships alongside 
                AI companionship, viewing our AI companions as supplements to—not replacements for—human connection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [currentView, setCurrentView] = useState<ViewType>('home');
  
  useEffect(() => {
    if (user) {
      router.push('/swipe'); // If already signed in, redirect to swipe page
    }
  }, [user, router]);

  // Render the appropriate view based on currentView state
  const renderView = () => {
    switch (currentView) {
      case 'inspiration':
        return <InspirationView />;
      case 'philosophy':
        return <PhilosophyView />;
      case 'home':
      default:
        return <HomeView />;
    }
  };

  return (
    <div className='pt-16 min-h-screen bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100'>
      <main className='container mx-auto px-6 py-16'>
        <Navbar currentView={currentView} setCurrentView={setCurrentView} />
        {renderView()}
      </main>

      <footer className='bg-earth-100 mt-20'>
        <div className='container mx-auto px-6 py-6'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='text-earth-700 mb-2 md:mb-0 text-sm'>
              © 2024 Galatea.AI. All rights reserved.
            </div>
            <div className='flex space-x-4'>
              <Link
                href='/privacy'
                className='text-earth-600 hover:text-rose-700 transition-colors text-sm'
              >
                Privacy Policy
              </Link>
              <Link
                href='/terms'
                className='text-earth-600 hover:text-rose-700 transition-colors text-sm'
              >
                Terms of Service
              </Link>
              <Link
                href='/contact'
                className='text-earth-600 hover:text-rose-700 transition-colors text-sm'
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className='bg-ivory-100 bg-opacity-70 rounded-lg shadow-md p-8 text-center transition-transform hover:scale-105'>
      <div className='flex justify-center mb-6'>{icon}</div>
      <h3 className='text-2xl font-semibold text-earth-800 mb-4'>{title}</h3>
      <p className='text-earth-600 text-lg'>{description}</p>
    </div>
  );
}
