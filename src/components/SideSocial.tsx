import { PiInstagramLogo, PiFacebookLogo, PiWhatsappLogo, PiYoutubeLogo } from 'react-icons/pi';
  // nav data
  export const navData = [
    { name: 'Instagram', href: '/', icon: <PiInstagramLogo /> },
    { name: 'Facebook', href: '/', icon: <PiFacebookLogo /> },
    { name: 'Whatsapp', href: '/services', icon: <PiWhatsappLogo /> },
    { name: 'Youtube', path: '/work', icon: <PiYoutubeLogo /> },
    
  ];

 

  
  const SideSocial = () => {
    
    
    return (
      <nav className="fixed bottom-0 top-0 z-50 mt-auto flex h-max w-full flex-col items-center gap-y-4 xl:right-[2%] xl:h-screen xl:w-16 xl:max-w-md xl:justify-center">
        {/* inner */}
        <div
          className="flex h-[80px] w-full items-center justify-between gap-y-10 bg-white/10 px-4 py-8 text-3xl backdrop-blur-sm md:px-40 xl:h-max xl:flex-col
        xl:justify-center xl:rounded-full xl:px-0 xl:text-xl"
        >
          {navData.map((link, index) => {
            return (
              <a
                className={`${
                  link.href 
                } hover:text-accent group relative flex items-center transition-all duration-300`}
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
              >
                {/* tooltip */}
                <div className="absolute right-0 hidden pr-14 xl:group-hover:flex">
                  <div className="text-primary relative flex items-center rounded-[3px] bg-white p-[6px]">
                    <div className="text-[12px] font-semibold capitalize leading-none">
                      {link.name}
                    </div>
                    {/* triangle */}
                    <div className="absolute -right-2 border-y-[6px] border-l-8 border-r-0 border-solid border-y-transparent border-l-white"></div>
                  </div>
                </div>
                {/* icon */}
                <div className="text-white">{link.icon}</div>
              </a>
            );
          })}
        </div>
      </nav>
    );
  };
  
  export default SideSocial;
  