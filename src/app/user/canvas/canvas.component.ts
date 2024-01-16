import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CanvasSetupService } from '../../core/services/canvas-setup.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { faTrash, faPaintBrush, faMagnet, faPlus, faMinus, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { MatRadioModule } from '@angular/material/radio';
import { PointDTO } from '../../core/dto/point.dto';
import { ThemeService } from '../../core/services/theme.service';
import { ApiService } from '../../core/services/api.service';

@Component({
	selector: 'app-canvas',
	standalone: true,
	imports: [
		CommonModule,
		FontAwesomeModule,
		ReactiveFormsModule,
		HttpClientModule,
		MatInputModule,
		MatFormFieldModule,
		MatRadioModule
	],
	templateUrl: './canvas.component.html',
	styleUrl: './canvas.component.scss'
})
export class CanvasComponent implements AfterViewInit {
	@ViewChild('graphCanvas') canvasRef!: ElementRef;

	constructor(
		public canvasSetup: CanvasSetupService,
		private errorHandlerService: ErrorHandlerService,
		public themeService: ThemeService,
		private apiService: ApiService
	) { }

	ngAfterViewInit() {
		const r = 3; // R = 3; base value for showcasing the graph to user
		this.canvasSetup.setupCanvas(this.canvasRef.nativeElement, r);
		this.drawGraph(r);
		this.restorePoints(r);
		this.listenToRCoordinateChanges();
	}


	// ----------<  Canvas setup  >----------
	onCanvasClick(e: MouseEvent): void {
		const rValue = this.coordinatesForm.value.rCoordinate;
		if (!rValue) {
			this.errorHandlerService.showErrorSnackBar("• There is no r to validate your hit :(\n• Enter R value");
			return;
		}

		const canvas = this.canvasSetup.getCanvas()
		const rect = canvas.getBoundingClientRect();

		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;

		let canvasX = (e.clientX - rect.left) * scaleX;
		let canvasY = (e.clientY - rect.top) * scaleY;

		// Snap coordinates if magnet mode is active
		let { x, y } = this.translateCanvasCoordsToReal(canvasX, canvasY);
		if (this.canvasSetup.getMagnetModeState()) {
			x = this.snapToGrid(x);
			y = this.snapToGrid(y);
		}

		// Drawing
		({ canvasX, canvasY } = this.translateRealCoordsToCanvas(x, y));
		this.drawDotOnCanvas(canvasX, canvasY);

		// Sending
		console.log(x, y);
		this.sendCoordinates(x, y);
	}

	private drawGraph(R: number): void {
		this.canvasSetup.setDynamicScalingFactor(R);
		const { ctx, width, height, k, dynamicScalingFactor } = this.canvasSetup.getGraphSetup();

		// Setup axes
		const yAxisOffset = 15;
		const xAxisStartX = (width / 2) - ((width / 4) * k);
		const xAxisEndX = (width / 2) + ((width / 4) * k);
		const yAxisStartY = (height / 2) + ((height / 4) * k);
		const yAxisEndY = (height / 2) - ((height / 4) * k);

		// Clear canvas
		ctx.clearRect(0, 0, width, height);
		ctx.font = "15px Arial";
		ctx.strokeStyle = "gray";
		ctx.lineWidth = 1;

		// Draw scaled axes
		this.drawAxis(ctx, xAxisStartX, height / 2, xAxisEndX, height / 2, k);  // X-axis
		this.drawAxis(ctx, width / 2, yAxisStartY, width / 2, yAxisEndY, k); // Y-axis

		// Drawing the areas

		// Triangle (lower-right)
		ctx.fillStyle = "#FFFF0010"; // yellow with 10% opacity
		ctx.beginPath();
		ctx.moveTo(width / 2, height / 2);
		ctx.lineTo(width / 2 + R / 2 * dynamicScalingFactor, height / 2);
		ctx.lineTo(width / 2, height / 2 + R / 2 * dynamicScalingFactor);
		ctx.closePath();
		ctx.fill();
		ctx.strokeStyle = "#FFFF00";
		ctx.stroke();

		// Rectangle (bottom-left)
		ctx.fillStyle = "#0000FF10"; // blue with 10% opacity
		ctx.fillRect(width / 2 - R * dynamicScalingFactor, height / 2, R * dynamicScalingFactor, R / 2 * dynamicScalingFactor);
		ctx.strokeStyle = "#0000FF";
		ctx.strokeRect(width / 2 - R * dynamicScalingFactor, height / 2, R * dynamicScalingFactor, R / 2 * dynamicScalingFactor);

		// Semicircle (upper-right)
		ctx.fillStyle = "#39FF1410"; // green with 10% opacity
		ctx.beginPath();
		ctx.arc(width / 2, height / 2, R / 2 * dynamicScalingFactor, 1.5 * Math.PI, 2 * Math.PI);
		ctx.lineTo(width / 2, height / 2);
		ctx.closePath();
		ctx.fill();
		ctx.strokeStyle = "#39FF14";
		ctx.stroke();


		// Draw labels
		ctx.fillStyle = "white";
		// X-axis labels
		ctx.fillText(R.toString(), width / 2 + R * dynamicScalingFactor, height / 2 + 30);
		ctx.fillText((R / 2).toString(), width / 2 + (R / 2) * dynamicScalingFactor, height / 2 + 30);
		ctx.fillText((-R).toString(), width / 2 - R * dynamicScalingFactor, height / 2 + 30);
		ctx.fillText((-R / 2).toString(), width / 2 - (R / 2) * dynamicScalingFactor, height / 2 + 30);
		ctx.fillText("X", width / 2 + (3.12 * R / 2) * dynamicScalingFactor, height / 2 + 5);

		// Y-axis labels
		ctx.fillText(R.toString(), width / 2 + yAxisOffset, height / 2 - R * dynamicScalingFactor);
		ctx.fillText((R / 2).toString(), width / 2 + yAxisOffset, height / 2 - (R / 2) * dynamicScalingFactor);
		ctx.fillText((-R).toString(), width / 2 + yAxisOffset, height / 2 + R * dynamicScalingFactor);
		ctx.fillText((-R / 2).toString(), width / 2 + yAxisOffset, height / 2 + (R / 2) * dynamicScalingFactor);
		ctx.fillText("Y", width / 2 - 5, height / 2 - (3.15 * R / 2) * dynamicScalingFactor);

		// Draw ticks
		ctx.fillStyle = "white";
		// X-axis tics
		const tickLength = 10; // Length of the tick marks
		for (let tickValue = -R; tickValue <= R; tickValue += R / 2) {
			const xTickPosition = width / 2 + tickValue * dynamicScalingFactor;
			ctx.beginPath();
			ctx.moveTo(xTickPosition, height / 2 - tickLength / 2);
			ctx.lineTo(xTickPosition, height / 2 + tickLength / 2);
			ctx.stroke();
		}

		// Y-axis tics
		for (let tickValue = -R; tickValue <= R; tickValue += R / 2) {
			const yTickPosition = height / 2 - tickValue * dynamicScalingFactor;
			ctx.beginPath();
			ctx.moveTo(width / 2 - tickLength / 2, yTickPosition);
			ctx.lineTo(width / 2 + tickLength / 2, yTickPosition);
			ctx.stroke();
		}
	}

	private drawAxis(context: { beginPath: () => void; moveTo: (arg0: any, arg1: any) => void; lineTo: (arg0: number, arg1: number) => void; stroke: () => void; }, fromX: number, fromY: number, toX: number, toY: number, k: number) {
		const headLength = 10 * k; // Scale the arrowhead size
		const angle = Math.atan2(toY - fromY, toX - fromX);

		context.beginPath();
		context.moveTo(fromX, fromY);
		context.lineTo(toX, toY);
		context.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
		context.moveTo(toX, toY);
		context.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
		context.stroke();
	}

	private translateCanvasCoordsToReal(canvasX: number, canvasY: number) {
		const width = this.canvasSetup.getWidth();
		const height = this.canvasSetup.getHeight();
		const dynamicScalingFactor = this.canvasSetup.getDynamicScalingFactor();

		let graphX = (canvasX - width / 2) / dynamicScalingFactor;
		let graphY = (height / 2 - canvasY) / dynamicScalingFactor;
		return { x: graphX, y: graphY };
	}

	private translateRealCoordsToCanvas(x: number, y: number) {
		const width = this.canvasSetup.getWidth();
		const height = this.canvasSetup.getHeight();
		const dynamicScalingFactor = this.canvasSetup.getDynamicScalingFactor();

		let canvasX = x * dynamicScalingFactor + width / 2;
		let canvasY = height / 2 - y * dynamicScalingFactor;
		return { canvasX, canvasY };
	}

	private snapToGrid(value: number): number {
		if (this.coordinatesForm.value.rCoordinate) {
			const step = parseFloat(this.coordinatesForm.value.rCoordinate) / 2;
			return Math.round(value / step) * step;
		} else {
			this.errorHandlerService.showErrorSnackBar("• There is nothing to snap to :(\n• Enter R value");
			return value;
		}
	}

	private drawDotOnCanvas(x: number, y: number, r?: number, result?: boolean, isRealCoords = false) {
		const ctx = this.canvasSetup.getContext();
		let canvasX, canvasY;
		// console.log(x, y, r, result, isRealCoords);
		// console.log("drawing");

		if (isRealCoords) {
			({ canvasX, canvasY } = this.translateRealCoordsToCanvas(x, y));
			// console.log("Translation: ", x, y);
		} else {
			canvasX = x;
			canvasY = y;
		}

		// console.log("Coords: ", canvasX, canvasY);

		ctx.fillStyle = result === undefined ? "gray" : result ? "green" : "red";
		ctx.beginPath();
		ctx.arc(canvasX, canvasY, 5, 0, Math.PI * 2);
		ctx.fill();
	}





	// Fontawesome icons
	faTrash = faTrash;
	faPaintBrush = faPaintBrush;
	faMagnet = faMagnet;
	faPlus = faPlus;
	faMinus = faMinus;
	faRotateRight = faRotateRight;


	// ----------<  Reactive form  >----------
	xCoordinates = [-3, -2, -1, 0, 1, 2, 3, 4, 5];
	rCoordinates = [1, 2, 3, 4, 5];

	coordinatesForm = new FormGroup({
		xCoordinate: new FormControl('', [Validators.required]),
		yCoordinate: new FormControl('', [
			Validators.required,
			Validators.min(-5),
			Validators.max(3),
			Validators.pattern(/^-?\d+(\.\d+)?$/) // Validates for numeric input (including decimal numbers)
		]),
		rCoordinate: new FormControl('3', [Validators.required])
	});

	setXCoordinate(x: number): void {
		this.coordinatesForm.get('xCoordinate')?.setValue(x.toString());
	}

	setRCoordinate(r: number): void {
		this.coordinatesForm.get('rCoordinate')?.setValue(r.toString());
	}

	listenToRCoordinateChanges() {
		this.coordinatesForm.get('rCoordinate')?.valueChanges.subscribe((newRValue) => {
			if (newRValue) {
				const r = parseFloat(newRValue);
				this.drawGraph(r);
				this.restorePoints(r);
			}
		});
	  }	


	// ----------<  Http logic  >----------
	results: PointDTO[] = [];

	submitCoordinates(): void {
		if (this.coordinatesForm.valid) {
			console.log('Form Data:', this.coordinatesForm.value);
			if (this.coordinatesForm.value.xCoordinate && this.coordinatesForm.value.yCoordinate && this.coordinatesForm.value.rCoordinate) {
				const pointDTO: PointDTO = {
					x: parseFloat(this.coordinatesForm.value.xCoordinate),
					y: parseFloat(this.coordinatesForm.value.yCoordinate),
					r: parseFloat(this.coordinatesForm.value.rCoordinate)
				};

				// Drawing
				const { canvasX, canvasY } = this.translateRealCoordsToCanvas(pointDTO.x, pointDTO.y);
				this.drawDotOnCanvas(canvasX, canvasY);

				// Sending
				this.apiService.addPoint(pointDTO).subscribe({
					next: (createdPoint) => {
						console.log('Point added:', createdPoint);
						this.results.push(createdPoint);
						this.drawDotOnCanvas(createdPoint.x, createdPoint.y, createdPoint.r, createdPoint.result, true);
					},
					error: (err) => this.errorHandlerService.handleError(err)
				});

			} else {
				console.log("Bruh goofy ahh form control doesn't work");
			}
		}
	}

	sendCoordinates(x: number, y: number): void {
		// Check if R value is available
		const rValue = this.coordinatesForm.value.rCoordinate;
		if (!rValue) {
			this.errorHandlerService.showErrorSnackBar("• There is no r to validate your hit :(\n• Enter R value");
			return;
		}

		const pointDTO: PointDTO = {
			x: x,
			y: y,
			r: parseFloat(rValue)
		};

		this.apiService.addPoint(pointDTO).subscribe({
			next: (createdPoint) => {
				console.log('Point added: {}', createdPoint);
				this.results.push(createdPoint);
				this.drawDotOnCanvas(createdPoint.x, createdPoint.y, createdPoint.r, createdPoint.result, true);
			},
			error: (err) => this.errorHandlerService.handleError(err)
		});
	}

	restorePoints(r: number): void {
		this.apiService.redrawAllPoints(r).subscribe({
			next: (points) => {
				console.log('Received user points:', points);
				this.results = points;
				points.forEach((point) => {
					this.drawDotOnCanvas(point.x, point.y, point.r, point.result, true);
				})
			},
			error: (err) => this.errorHandlerService.handleError(err)
		});
	}

	deleteAllPoints(): void {
		this.apiService.deleteAllPoints().subscribe({
			next: (resp) => {
				this.errorHandlerService.showErrorSnackBar(resp, 5000);
				this.updateGraph();
			},
			error: (err) => this.errorHandlerService.handleError(err)
		})
	}



	//  ----------<  Toggles  >----------
	// TODO: implement all those toggles logic
	toggleDrawMode(): void {
		this.errorHandlerService.showErrorSnackBar("Toggling draw mode", 5000);
		this.canvasSetup.setDrawModeState(!this.canvasSetup.getDrawModeState());
	}

	toggleMarnetMode() {
		this.errorHandlerService.showErrorSnackBar("Toggling magnet mode", 5000);
		this.canvasSetup.setDrawModeState(!this.canvasSetup.getDrawModeState());
	}

	toggleZoomIn() {
		this.errorHandlerService.showErrorSnackBar("Zooming in", 3000);
		this.canvasSetup.setK(this.canvasSetup.getK()*1.1);

		this.updateGraph();
	}

	toggleZoomOut() {
		this.errorHandlerService.showErrorSnackBar("Zooming out", 3000);
		this.canvasSetup.setK(this.canvasSetup.getK()/1.1);

		this.updateGraph();
	}

	toggleRestoreZoom() {
		this.errorHandlerService.showErrorSnackBar("Restoring zoom", 3000);
		this.canvasSetup.setK(1.7);

		this.updateGraph();
	}

	private updateGraph(): void {
		const rValue = this.coordinatesForm.get('rCoordinate')?.value;
		var r;
		if (rValue) {
			r = parseFloat(rValue);
		} else { 
			r = 1;
		}
		this.drawGraph(r);
		this.restorePoints(r);
	}

}
