import { Image, View } from "@react-pdf/renderer";

export default function FormatLogo({ currentFirm }) {

    return (
        <View>
            <Image
                src={currentFirm.logoUrl || ".\\logo192.png"}
                alt={"alt"}
                style={{ height: '10mm', objectFit: 'contain' }}
            />
        </View>
    )
}