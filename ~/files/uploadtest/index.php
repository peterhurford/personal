<h2>Upload New</h2>
<p>Takes any image, uploads it, and automatically generates a thumbnail and uploads that too.</p>
<form action="index.php" method="post" enctype="multipart/form-data">
  <p>Upload up to four files: <input type="file" name="userfile[]" multiple="true" id="uploaded_file"></p>
  <input type="submit" value="Send files" />
</form>

<?php
# we first include the upload class, as we will need it here to deal with the uploaded file
include('class.upload.php'); # use class.upload library (http://www.verot.net/php_class_upload.htm)
$dir = "uploads/"; # folder containing images
$thumbwidth = 300; # the width of thumbnail image

# UPLOAD IMAGE
if (!empty($_FILES["userfile"])) {
    # as it is multiple uploads, we will parse the $_FILES array to reorganize it into $files
    $files = array();
    foreach ($_FILES['userfile'] as $k => $l) {
        foreach ($l as $i => $v) {
            if (!array_key_exists($i, $files)) {
                $files[$i] = array();
            }
            $files[$i][$k] = $v;
        }
    }

    $j = 1;
    foreach ($files as $myFile) { #loop through files
        echo "Processing image #$j...";
        $j++;

        if ($j > 5) {
            echo "<p>Limit four files.</p>";
            exit;
        }

        # verify the file is a GIF, JPEG, or PNG
        # this is pretty minimal security and should be upgraded later, but is fine for now.
        if (is_uploaded_file($myFile["tmp_name"])) {
            $fileType = exif_imagetype($myFile["tmp_name"]);
            $allowed = array(IMAGETYPE_GIF, IMAGETYPE_JPEG, IMAGETYPE_PNG);
            if (!in_array($fileType, $allowed)) {
                echo "<p>Error: Please only upload an image (.gif, .jpg, .png).</p>";
                exit;
            }
        }

        # we create an instance of the class, giving as argument the PHP object
        # corresponding to the file field from the form
        # All the uploads are accessible from the PHP object $_FILES
        $handle = new Upload($myFile);

        if ($handle->uploaded) { # then we check if the file has been uploaded properly in its *temporary* location in the server (often, it is /tmp)
            $handle->Process($dir); # now, we start the upload 'process'. That is, to copy the uploaded file from its temporary location to the wanted location

            if ($handle->processed) {  # we check if everything went OK
                echo "<p>Large image uploaded successfully.</p>";
             }
             else { # one error occured
                 echo "<p>Error: Unknown server-side upload error.</p>";
             }

             # now to create the thumbnail
             $handle->file_name_body_add = '_thumb'; #append "_thumb" to filename
             $handle -> image_resize = true;     # turn on resize engine
             $handle -> image_x = $thumbwidth;   # scale x to thumbnail width
             $handle -> image_ratio_y = true;    # scale y to match ratio with new width
             $handle -> Process($dir);           # make image

             if ($handle->processed) {
                 echo '<p>Thumbnail version uploaded successfully.</p>';
             }
             else { 
                 echo "<p>Error: Unknown server-side thumbnail generation error.</p>";
             }

             $handle-> Clean(); # we delete the temporary files

        }
        else {  # if we're here, the upload file failed for some reason...
            if (is_uploaded_file($myFile["tmp_name"])) {
                echo "<p>Error: Unknown error.</p>";
            }
            else { 
                echo "<p><i>No file here.</i></p>";
            }
        }
    }
}


# Display all Uploaded Images
echo "<h2>Current Files</h2>";
$k = 0;
foreach (glob("uploads/".'*') as $filename) {
    $k++;
    $info = getimagesize($filename);
    echo '<p>';
    echo 'File: <a href="' . $filename . '">' . $filename . '</a><br>';
    echo '(' . $info['mime'] . ' - ' . $info[0] . ' x ' . $info[1] .' -  ' . round(filesize($filename)/256)/4 . 'KB)';
    echo '</p>';
}
if ($k > 0) { echo "<p><i>$k files total.</i></p>"; }
else { echo "<p><i>No files found.</i></p>"; }
?>