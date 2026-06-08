import { Link } from 'react-router';

export default function Terms() {
  return (
    <div className="about-page">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut tempus
        diam. Donec posuere quam ac lacus fringilla, euismod tristique ipsum
        semper. Duis ornare iaculis aliquam. Sed pellentesque dolor sem, non
        faucibus nisi volutpat facilisis. Curabitur ut hendrerit sapien. Morbi
        maximus, lectus non posuere dapibus, ex nisl mollis orci, nec imperdiet
        erat ex vel eros. Phasellus vel placerat nulla. Mauris elementum diam
        nisl, vel pulvinar elit tristique in. Proin interdum placerat elit sit
        amet vulputate. Ut non ullamcorper ante. Nullam faucibus malesuada
        volutpat. Donec est lacus, dapibus in pharetra vitae, cursus sed arcu.
        Quisque aliquet tempor arcu, eget faucibus odio dapibus quis. Sed sed
        massa felis. Nunc sodales et orci eu suscipit. Nullam et tincidunt diam.
        Cras vel velit ac augue suscipit facilisis sed in ante. Duis tincidunt,
        turpis a ornare consequat, ligula quam lacinia enim, ac tristique tellus
        turpis sit amet lacus. Cras porta, lorem nec euismod egestas, justo urna
        pharetra dui, nec sollicitudin quam purus ac arcu. Morbi venenatis sed
        eros sed egestas. Etiam vitae tincidunt magna, at posuere ante. Maecenas
        in eros at velit pharetra condimentum. Vivamus elementum enim ultrices,
        fermentum purus sed, viverra est. Duis vitae diam nunc. Nam laoreet
        augue at magna tempus rhoncus. Mauris nulla eros, posuere vitae nisi a,
        feugiat accumsan massa. Aenean ultrices tempor dui eget consequat.
        Suspendisse efficitur mauris in rutrum consequat. Cras laoreet, erat non
        auctor fermentum, nibh ligula ornare nunc, eu iaculis odio nulla
        ultricies nunc. Mauris ac tellus nisl. Curabitur vulputate vitae purus
        nec cursus. Nam commodo lacinia leo lacinia egestas. Phasellus vehicula
        non erat non maximus. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Cras tristique lacus vel dui auctor faucibus. Duis fringilla metus
        vitae justo fringilla, sit amet pulvinar ipsum rutrum. Maecenas
        tincidunt tincidunt enim eu hendrerit. Maecenas justo lorem, efficitur
        imperdiet condimentum ut, efficitur at massa. Nulla egestas suscipit sem
        id volutpat. Etiam quis velit tempus, pharetra justo vitae, sagittis
        tellus. Nam tempus neque facilisis quam laoreet, vitae hendrerit eros
        gravida. Nulla semper sit amet nisl at laoreet. Cras at viverra enim, ac
        aliquam orci. Sed feugiat, risus quis tristique cursus, purus nisi
        lobortis lorem, sit amet fermentum odio massa quis mi. Phasellus varius
        mauris eget gravida volutpat. Praesent finibus vel velit a lacinia.
        Suspendisse potenti. Donec semper eros nec accumsan vehicula. Nulla
        fringilla, arcu eget ullamcorper pellentesque, felis orci aliquam dui,
        consequat egestas arcu nisi ac lorem. Aliquam velit quam, auctor vitae
        ipsum sit amet, pellentesque dictum nibh. Phasellus euismod sagittis
        eros, vel finibus dui vestibulum in. Duis libero neque, sodales et diam
        id, bibendum vehicula arcu. Sed quis facilisis ante, eget ornare ante.
        Aliquam in maximus felis. Etiam consequat sagittis ligula sit amet
        iaculis. Nunc ut nulla malesuada ex tempus ullamcorper. Mauris aliquam
        tincidunt lacus, fermentum semper diam laoreet ac. Integer nunc felis,
        euismod nec urna sit amet, porttitor tincidunt augue. Duis feugiat
        euismod nisi et blandit. In ut ipsum urna. Phasellus nisl erat, rhoncus
        id enim dictum, commodo consequat quam. Integer a metus quis nisl
        vestibulum tristique. Aenean lacinia erat sed est pretium, sit amet
        convallis tellus suscipit. Sed quis nibh vel augue facilisis semper eu
        quis nisi. Praesent et scelerisque dui. Integer nisl odio, dapibus ac
        magna non, ultrices commodo leo. Fusce et diam ac risus pulvinar posuere
        sed non orci. Phasellus dignissim purus id volutpat pretium. Phasellus
        mi mauris, aliquam et neque ut, bibendum molestie elit. Aenean quis
        vehicula orci. Phasellus sit amet tristique ex. Nullam ac euismod justo.
        Fusce dapibus diam nec tempus elementum.
      </p>
      <br />
      <Link
        id="backtobtn"
        to="/"
        style={{
          color: 'red',
        }}
      >
        {' '}
        ⬅️
        <br />I have read all the terms and conditions and want to return to the
        main page.
      </Link>
    </div>
  );
}
