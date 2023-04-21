import { Button } from "antd";
import Link from "next/link";
import SideNavbar from "../components/SideNavbar";

const AboutUs = () => {
  return (
    <div className="bg-white dark:bg-slate-800 flex flex-col content-center">
      <SideNavbar />
      <div className="flex  sticky top-0 z-50">
       
        <div>
        
        </div>
      </div>
      <h1
        style={{ fontSize: 64, fontWeight: 500, alignSelf: "center" }}
        className="text-black dark:text-slate-100"
      >
        About Us
      </h1>

      <h1
        style={{ fontSize: 54, fontWeight: 500 }}
        className="text-black dark:text-slate-100"
      >
        In English
      </h1>
      <p
        style={{ fontSize: 20 }}
        className="p-10 text-black dark:text-slate-100"
      >
        News Jasoos is a news portal. In which we verify and write news related
        to crime. The news which is recent is written in the standard format of
        the news. And the news which is of few days, months or years old is
        written by keeping them in the category of feature and making them
        creative like a story. Apart from this, we also write about incidents in
        the cinematic industry,box office collections and movie reviews. If
        there is any important news, then we write it prominently, no matter
        what category it is. We write all our news content ourselves, but while
        writing some content, we do research with the help of different news
        portals. Whose credit we give to that news portal with the content. If
        any incident happens in our own city, then we go there and click the
        pictures ourselves. Otherwise we take it from some other sources, whose
        credit we also give along with the news. Our main objective is to bring
        the news to you with transparency. For which our way forward is to
        follow up the news and provide in-depth news to you.If there is any
        incident in your place, which is ignored by local authorities and you
        think it is important. Do let me know through email or whatsapp.
      </p>

      <h1
        style={{ fontSize: 54, fontWeight: 500 }}
        className="text-black dark:text-slate-100"
      >
        हिंदी में
      </h1>
      <div
        style={{ fontSize: 20 }}
        className="p-10 text-black dark:text-slate-100"
      >
        न्यूज़ जासूस एक न्यूज़ पोर्टल है। जिसमें हम क्राइम से जुड़ी हुई खबरों को
        सत्यापित करकर लिखते है। जो न्यूज़ हालिया होती है उनको न्यूज़ के मानक
        प्रारूप में ही लिखा जाता है। और जो न्यूज़ कुछ दिन, महीने या साल पुरानी
        होती है उनको फीचर की श्रेणी में रखकर कहनी की तरह रचनात्मक बनाकर लिखा
        जाता है। इसके अलावा हम सिनेमा जगत की घटनाओं, बॉक्स ऑफिस कलेक्शन और मूवी
        रिव्यू भी लिखते है। अगर कोई महत्वपूर्ण ख़बर है तो उसे हम प्रमुखत: से
        लिखते है चाहें वो किसी भी श्रेणी की हो। हम अपना सभी न्यूज़ कंटेंट खुद ही
        लिखते है लेकिन कुछ कंटेंट को लिखते समय हम अलग-अलग न्यूज़ पोर्टल की
        सहायता लेकर रिसर्च करते है। जिसका क्रेडिट हम उस न्यूज़ पोर्टल को कंटेंट
        के साथ दे देते है। अगर कोई घटना हमारे ही शहर की होती है तो वहां पर जाकर
        हम खुद तस्वीरें को क्लिक करते है।अन्यथा उसे किसी अन्य स्त्रोतों से लेते
        है जिसका क्रेडिट भी हम न्यूज़ के साथ दे देते है। हमारा मुख्य उद्देश्य आप
        तक न्यूज़ को पारदर्शिता के साथ पहुंचाना है। जिसके लिए हमारी आगे की राह
        खबरों का फॉलो अप करकर उसकी तह तक जानकारी आपको देना है।अगर आपके यहां कोई
        ऐसी घटना हुई हो जिस पर कोई ध्यान नहीं दे रहा हो और आपको लगता हो कि ये
        महत्वपूर्ण है तो आप हमें वो ख़बर भेज सकते है।
      </div>
    </div>
  );
};

export default AboutUs;
