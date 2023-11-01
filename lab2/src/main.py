import cv2
import numpy as np
import tkinter as tk
from tkinter import filedialog
from PIL import Image, ImageTk

original_image_th = None
active_image_th = None

original_image_sharpen = None
active_image_sharpen = None

def bernsen(image, size, C):
    processed = cv2.adaptiveThreshold(image, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, size, C)
    return processed

def niblack_threshold(img, n, k):
    dx, dy = img.shape
    img_n = img.copy()

    # Calculate the radius of the neighborhood
    w = (n - 1) // 2

    for i in range(w, dx - w):
        for j in range(w, dy - w):
            # Extract the neighborhood area
            block = img[i - w:i + w + 1, j - w:j + w + 1]

            # Calculate the mean and standard deviation of the neighborhood region
            wBmn = np.mean(block)
            wBstd = np.std(block)

            # Calculate the threshold value
            wBTH = wBmn + k * wBstd

            # Threshold the pixel
            if img[i, j] < wBTH:
                img_n[i, j] = 0
            else:
                img_n[i, j] = 255

    return img_n

def sharpen_image(img):
    kernel = np.array([[-1, -1, -1],
                  [-1, 9, -1],
                  [-1, -1, -1]])

    sharp_image = cv2.filter2D(img, -1, kernel)

    return sharp_image

def open_image_th():
    global original_image_th
    global active_image_th
    file_path = filedialog.askopenfilename(filetypes=[("Image files", "*.jpg *.png *.jpeg *.gif *.bmp")])
    if file_path:
        original_image_th = Image.open(file_path)
        photo = ImageTk.PhotoImage(original_image_th)
        image_label_th.config(image=photo)
        image_label_th.image = photo

def open_image_sharpen():
    file_path = filedialog.askopenfilename(filetypes=[("Image files", "*.jpg *.png *.jpeg *.gif *.bmp")])
    if file_path:
        global original_image_sharpen
        global active_image_sharpen
        original_image_sharpen = Image.open(file_path)
        active_image_sharpen = original_image_th
        photo = ImageTk.PhotoImage(original_image_sharpen)
        image_label_sharpen.config(image=photo)
        image_label_sharpen.image = photo

def save_image_th():
    global active_image_th
    if active_image_th:
        file_path = filedialog.asksaveasfilename(defaultextension=".jpg", filetypes=[("JPEG files", "*.jpg")])
        if file_path:
            active_image_th.save(file_path, format="JPEG", quality=80)


def save_image_sharpen():
    global active_image_sharpen
    if active_image_sharpen:
        file_path = filedialog.asksaveasfilename(defaultextension=".jpg", filetypes=[("JPEG files", "*.jpg")])
        if file_path:
            active_image_sharpen.save(file_path, format="JPEG", quality=80)

def show_bernsen_image():
    global active_image_th
    global original_image_th
    if original_image_th:
        open_cv_image = np.array(original_image_th)
        if open_cv_image.ndim == 2 or (open_cv_image.ndim == 3 and open_cv_image.shape[2] == 1):
            grayImage = open_cv_image  
        else:
            grayImage = cv2.cvtColor(open_cv_image, cv2.COLOR_BGR2GRAY)
        modified_image = bernsen(grayImage, 15, 15)
        pil_image = Image.fromarray(modified_image)
        active_image_th = pil_image.copy()
        photo = ImageTk.PhotoImage(pil_image)
        image_label_th.config(image=photo)
        image_label_th.image = photo

def show_niblack_image():
    global active_image_th
    global original_image_th
    if original_image_th:
        open_cv_image = np.array(original_image_th)
        if open_cv_image.ndim == 2 or (open_cv_image.ndim == 3 and open_cv_image.shape[2] == 1):
            grayImage = open_cv_image  
        else:
            grayImage = cv2.cvtColor(open_cv_image, cv2.COLOR_BGR2GRAY)

        modified_image = niblack_threshold(grayImage, 15, -0.2)
        pil_image = Image.fromarray(modified_image)
        active_image_th = pil_image
        photo = ImageTk.PhotoImage(pil_image)
        image_label_th.config(image=photo)
        image_label_th.image = photo

def show_sharpen_image():
     global original_image_sharpen
     global active_image_sharpen
     if original_image_sharpen:
        open_cv_image = np.array(original_image_sharpen)
        modified_image = sharpen_image(open_cv_image)
        pil_image = Image.fromarray(modified_image)
        active_image_sharpen = pil_image
        photo = ImageTk.PhotoImage(pil_image)
        image_label_sharpen.config(image=photo)
        image_label_sharpen.image = photo


root = tk.Tk()
root.title("Lab2")
root.geometry("1200x800")

button_frame = tk.Frame(root)
button_frame.pack(side="left", padx=10, pady=10)

open_button_th = tk.Button(button_frame, text="Open image for thresholding", command=open_image_th)
open_button_th.pack(fill="x")

open_button_sharpen = tk.Button(button_frame, text="Open image for sharpening", command=open_image_sharpen)
open_button_sharpen.pack(fill="x")

save_button = tk.Button(button_frame, text="Save threshold image", command=save_image_th)
save_button.pack(fill="x")

save_button = tk.Button(button_frame, text="Save sharpen image", command=save_image_sharpen)
save_button.pack(fill="x")

operations_frame = tk.Frame(root)
operations_frame.pack(side="left", padx=10, pady=10)

show_bernsen_button = tk.Button(operations_frame, text="Show Bernsen image", command=show_bernsen_image)
show_bernsen_button.pack(fill="x")

show_niblack_button = tk.Button(operations_frame, text="Show Niblack image", command=show_niblack_image)
show_niblack_button.pack(fill="x")

show_sharpen_button = tk.Button(operations_frame, text="Show sharpen image", command=show_sharpen_image)
show_sharpen_button.pack(fill="x")


image_label_th = tk.Label(root)
image_label_th.pack()

image_label_sharpen = tk.Label(root)
image_label_sharpen.pack()

root.mainloop()
