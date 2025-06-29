import Link from "next/link";
import styles from "@/module/global.module.scss"
import Buttons from "@/components/shared/Buttons";
export default function Home() {
  return (
    <div className={styles.countainer}>
      <Link href={'/auth'}>
        <Buttons>
          Login / Register
        </Buttons>
      </Link>
    </div>
  );
}
