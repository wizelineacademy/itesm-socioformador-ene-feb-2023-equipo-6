import { Link, Outlet } from "@remix-run/react";
import Modal from "../components/Modal";
import QuestionForm from "../components/admininstrator/QuestionForm";

export default function TestComp() {
    return (
        <main className="bg-blue-100">
            <h1>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae erat iaculis, aliquam purus sed, vehicula leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer sapien metus, dignissim eget justo ut, congue viverra est. Vestibulum pellentesque ligula non elit sodales, et varius arcu finibus. Fusce cursus nec diam ac mollis. Nulla sed tellus est. Vivamus scelerisque consectetur enim sit amet eleifend. Vestibulum posuere est ut est mattis, sit amet suscipit sapien malesuada. Nam vel dignissim ligula. Etiam at turpis pretium, dignissim turpis eget, pulvinar odio. Aliquam dapibus ultrices placerat. Phasellus at laoreet felis. Sed sem nibh, volutpat non hendrerit et, accumsan in leo.

                Quisque purus metus, sollicitudin eget est feugiat, lobortis venenatis libero. Suspendisse in iaculis lectus. Nunc ultrices maximus suscipit. Nullam eget sollicitudin felis. Curabitur ultrices neque elementum egestas tempor. Praesent porttitor nisi iaculis massa imperdiet tempor. Suspendisse enim nisi, ornare non orci in, semper vestibulum purus. Maecenas diam ipsum, condimentum vel sollicitudin ut, volutpat ac nisi. In rhoncus, dui nec dignissim tincidunt, tellus libero fermentum leo, nec molestie lectus leo ut tortor. Nulla facilisi. Donec ligula metus, rhoncus condimentum dapibus ut, euismod sit amet mauris. Aenean euismod ante ipsum. In sit amet urna sed arcu vestibulum tempor.

                Phasellus cursus ante lectus, eu sollicitudin elit fermentum id. Integer finibus mi nec metus consectetur pellentesque. Aenean tincidunt cursus nulla non commodo. Curabitur sit amet velit sem. Donec in arcu dui. Praesent lorem orci, condimentum vitae metus non, ultrices vulputate est. Nam tristique ipsum ligula, non malesuada ipsum condimentum sit amet. Praesent elementum at leo vitae faucibus. Suspendisse sagittis, nulla ut cursus pulvinar, ipsum massa cursus lectus, non malesuada sem ante sit amet lectus. Proin fringilla velit mauris, quis commodo ex scelerisque sit amet. Curabitur posuere posuere felis quis dictum. Maecenas nec nibh faucibus, efficitur nisi at, fringilla nisi. In hac habitasse platea dictumst. Ut vestibulum tincidunt dui nec sollicitudin.

                Fusce felis dolor, blandit ut nibh vitae, placerat vestibulum sem. Quisque mi nibh, eleifend posuere maximus vitae, luctus quis mauris. Aliquam egestas libero bibendum massa lobortis scelerisque vel id urna. Praesent sit amet dolor lorem. Suspendisse a leo ultrices, luctus massa nec, laoreet leo. Proin lacus odio, vestibulum vel felis porttitor, elementum tincidunt sapien. Vestibulum nec rhoncus tellus, et fermentum libero.

                In eu leo ac velit aliquet fringilla. Donec magna felis, finibus eget ex nec, vulputate faucibus felis. Integer rutrum venenatis lorem eget suscipit. Aliquam cursus libero non ex elementum, ut tincidunt velit semper. In aliquam libero et erat tempor, ac pulvinar sem aliquam. Aliquam erat volutpat. Praesent id massa bibendum, lobortis nunc vel, blandit orci. Duis vestibulum augue non tortor congue eleifend. Phasellus vel massa nec dolor bibendum pellentesque. Integer viverra urna lacus, non eleifend purus fermentum vitae. Suspendisse rutrum felis et lorem varius facilisis. Morbi ultrices libero eget elit sagittis, sit amet sagittis nisl consequat. Morbi orci diam, ultricies quis nibh et, pretium malesuada nisl. Curabitur sagittis sem vitae dolor pellentesque hendrerit.
            </h1>
            <Link to="add">
                <div>Go to modal.</div>
            </Link>
            <Outlet />
        </main>
    );
}